const Router = require("koa-router")
const { Op } = require("sequelize")
const ResBody = require("../struct/ResBody")
const bcypt = require("../utils/bcypt")
const { sysConfig } = require("../config")
const { User, Token, Building } = require("../model")
const {
  UserController,
  RoomController,
  FloorController,
  BuildingController
} = require("../controller")
const utils = require("../utils")

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
  let { userId, role } = ctx.state.user
  const reqBody = ctx.request.body
  // 如果请求体中有userId，说明是管理员在修改用户信息
  if (reqBody.userId) {
    if (role !== "superAdmin") {
      throw new Error("403-拒绝访问API")
    }
    userId = reqBody.userId
  }
  const user = await User.findOne({ where: { id: userId } })
  for (let key in reqBody) {
    if (
      Object.hasOwnProperty.call(user.toJSON(), key) &&
      ![undefined, null, ""].includes(reqBody[key])
    ) {
      user[key] = reqBody[key]
    }
  }
  if (reqBody.password) {
    user.password = bcypt.hash(reqBody.password)
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

router.get("/searchAdmin", async ctx => {
  const { keywords } = ctx.request.query
  let admins = []
  if (keywords.trim()) {
    admins = await User.findAll({
      where: {
        role: "admin",
        [Op.or]: {
          name: { [Op.like]: `%${keywords}%` },
          account: { [Op.like]: `%${keywords}%` }
        }
      }
    })
  }
  ctx.body = new ResBody({ data: { admins, total: admins.length } })
})

router.get("/searchUser", async ctx => {
  const { keywords } = ctx.request.query
  let students = []
  if (keywords.trim()) {
    students = await User.findAll({
      where: {
        role: "student",
        [Op.or]: {
          name: { [Op.like]: `%${keywords}%` },
          account: { [Op.like]: `%${keywords}%` }
        }
      }
    })
  }
  ctx.body = new ResBody({ data: { students, total: students.length } })
})

router.post("/addAdmin", async ctx => {
  console.log(ctx.state)
  const currentUserRole = ctx.state.user.role
  if (currentUserRole !== "superAdmin") {
    throw new Error("403-拒绝访问API")
  }
  let { name, account, phone, password, role } = ctx.request.body
  utils.checkParams({ name, account, phone, password, role })
  if ((await User.findByAccount(account)) !== null) {
    const e = new Error("400-该学号/职工号已被注册")
    throw e
  }
  let user = await User.create({
    name,
    phone,
    account,
    password: bcypt.hash(password),
    role
  })
  ctx.body = new ResBody({ data: user })
})

router.get("/getAdminTableData", async ctx => {
  const admins = await User.findAll({
    where: {
      role: { [Op.or]: ["admin", "superAdmin"] }
    },
    include: [{ model: Building }]
  })
  ctx.body = new ResBody({ data: { admins, total: admins.length } })
})

router.get("/getStudentInfoByIdOrAccount", async ctx => {
  const { type, value } = ctx.request.query
  let userId = value
  if (type !== "id") {
    const user = await User.findOne({ where: { account: value } })
    if (!user) {
      throw new Error("无法找到该用户")
    }
    userId = user.id
  }
  const userInfo = await UserController.getStudentInfo(userId)
  ctx.body = new ResBody({ data: userInfo })
})

module.exports = router.routes()
