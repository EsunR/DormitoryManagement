const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const User = require("../model/user_model")
const Token = require("../model/token_model")
const bcypt = require("../utils/bcypt")
const { sysConfig } = require("../config")

const router = new Router()

router.post("/register", async ctx => {
  let { account, password } = ctx.request.body
  if ((await User.findByAccount(account)) !== null) {
    const e = new Error("400-该学号/职工号已被注册")
    throw e
  }
  let user = await User.createUser(account, password)
  ctx.body = new ResBody({ data: user })
})

router.post("/login", async ctx => {
  let { account, password } = ctx.request.body
  let user = await User.findByAccount(account)
  if (user === null) {
    let e = new Error("400-用户名错误")
    throw e
  }
  let result = bcypt.verify(password, user.password)
  if (result) {
    const token = await Token.createToken(user.id)
    ctx.body = new ResBody({ data: { token } })
  } else {
    ctx.body = new ResBody({ success: false, msg: "密码错误" })
  }
})

router.get("/info", async ctx => {
  let token = ctx.req.headers.authorization
  const { tokenId, userId, exp } = ctx.state.user
  // 1. 检查距离Token的过期时间
  const current = parseInt(String(new Date().valueOf() / 1000))
  if (exp - current < sysConfig.tokenExp / 2) {
    // 2. 如果相差超过一半时间，就创建一个新Token并返回
    Token.deleteById(tokenId)
    token = await Token.createToken(userId)
  }
  // 获取用户信息，前端在拿到用户信息后必须重新 set token，保证 token 为最新的
  const user = await User.findById(userId)
  if (user !== null) {
    user.token = token
    ctx.body = new ResBody({ data: user })
  } else {
    let e = new Error("未找到相关用户信息")
    throw e
  }
})

module.exports = router.routes()
