const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const User = require("../model/user_model")

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

module.exports = router.routes()
