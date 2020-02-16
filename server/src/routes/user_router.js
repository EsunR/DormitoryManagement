const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const bcypt = require("../utils/bcypt")
const { sysConfig } = require("../config")
const { User, Token } = require("../model")
const {
  UserController,
  RoomController,
  FloorController,
  BuildingController
} = require("../controller")

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
  const { tokenId, userId, exp, role } = ctx.state.user
  // 1. 检查距离Token的过期时间
  const current = parseInt(String(new Date().valueOf() / 1000))
  if (exp - current < sysConfig.tokenExp / 2) {
    // 2. 如果相差超过一半时间，就创建一个新Token并返回
    Token.deleteById(tokenId)
    token = await Token.createToken(userId)
  }
  // 获取用户信息，前端在拿到用户信息后必须重新 set token，保证 token 为最新的
  let user = await User.findOne({ where: { id: userId } })
  if (role === "student" && user.roomId) {
    const room = await user.getRoom()
    const floor = await room.getFloor()
    const building = await floor.getBuilding()
    user = user.toJSON()
    user.room = room
    user.floor = floor
    user.building = building
  }
  if (user !== null) {
    user.token = token
    ctx.body = new ResBody({ data: user })
  } else {
    let e = new Error("未找到相关用户信息")
    throw e
  }
})

router.post("/updateInfo", async ctx => {
  const { userId } = ctx.state.user
  const { name, phone, roomId, checkTime } = ctx.request.body
  const user = await User.findOne({ where: { id: userId } })
  user.name = name
  user.phone = phone
  user.roomId = roomId
  if (checkTime) {
    user.checkTime = checkTime
  }
  ctx.body = new ResBody({ data: await user.save() })
})

router.get("/getStudents", async ctx => {
  const { buildingId, floorId, roomId } = ctx.request.query
  let users = []
  if (roomId) {
    users = await RoomController.getStudents(roomId)
  } else if (floorId) {
    users = await FloorController.getStudents(floorId)
  } else if (buildingId) {
    users = await BuildingController.getStudents(buildingId)
  } else {
    users = await User.findAll({ where: { role: "student" } })
    users = await UserController.getStudentsInfo(users)
  }
  ctx.body = new ResBody({
    data: { users }
  })
})

module.exports = router.routes()
