const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Building, User, Room, Floor } = require("../model")
const { BuildingController } = require("../controller")
const router = new Router()
const utils = require("../utils/index.js")

router.get("/getBuildings", async ctx => {
  const buildings = await Building.findAll()
  for (let building of buildings) {
    building.setDataValue(
      "floorCount",
      await Floor.count({ where: { buildingId: building.id } })
    )
    building.setDataValue(
      "roomCount",
      await Room.count({ where: { buildingId: building.id } })
    )
    building.setDataValue(
      "studentCount",
      await (await BuildingController.getStudents(building.id)).length
    )
  }
  ctx.body = new ResBody({ data: { buildings } })
})

router.get("/getManageBuildings", async ctx => {
  const { role, userId } = ctx.state.user
  const user = await User.findById(userId)
  let buildings = []
  switch (user.role) {
    case "superAdmin":
      buildings = await Building.findAll()
      break
    case "admin":
      buildings = await user.getBuildings()
      break
    default:
      buildings = []
      break
  }
  ctx.body = new ResBody({ data: { buildings, role } })
})

router.get("/getBuildingInfo", async ctx => {
  const { buildingId } = ctx.request.query
  const building = await Building.findOne({ where: { id: buildingId } })
  const result = building.toJSON()
  result.floorCount = await Floor.count({ where: { buildingId } })
  result.roomCount = await Room.count({ where: { buildingId } })
  result.studentCount = (
    await BuildingController.getStudents(buildingId)
  ).length
  ctx.body = new ResBody({ data: result })
})

router.post("/addBuildingWithRoom", async ctx => {
  const { role } = ctx.state.user
  if (role !== "superAdmin") {
    throw new Error("403-拒绝访问API")
  }
  const { name, floorCount, roomCount } = ctx.request.body
  utils.checkParams({ name, floorCount, roomCount })
  const building = await Building.createBuilding({ name })
  // 为宿舍楼添加楼层
  for (let i = 1; i <= floorCount; i++) {
    const floor = await Floor.createFloor({ layer: i, buildingId: building.id })
    await Building.addFloor(building.id, floor)
    // 为楼层添加房间
    for (let j = 1; j <= roomCount; j++) {
      await Room.createRoom({
        number: i * 100 + j,
        floorId: floor.id,
        buildingId: building.id
      })
    }
  }
  ctx.body = new ResBody({ data: building })
})

router.del("/delBuilding", async ctx => {
  const { role } = ctx.state.user
  if (role !== "superAdmin") {
    throw new Error("403-拒绝访问API")
  }
  const { id } = ctx.request.query
  const result = await BuildingController.delBuilding(id)
  ctx.body = new ResBody({ data: result })
})

router.get("/getAdminTableData", async ctx => {
  const { buildingId } = ctx.request.query
  utils.checkParams({ buildingId })
  const building = await Building.findOne({ where: { id: buildingId } })
  const admins = await building.getAdmins()
  ctx.body = new ResBody({ data: { admins, total: admins.length } })
})

router.get("/getCleanerTableData", async ctx => {
  const { buildingId } = ctx.request.query
  utils.checkParams({ buildingId })
  const building = await Building.findOne({ where: { id: buildingId } })
  const cleaners = await building.getCleaners()
  ctx.body = new ResBody({ data: { cleaners, total: cleaners.length } })
})

router.post("/addAdminToBuilding", async ctx => {
  const { adminAccount, buildingId } = ctx.request.body
  const admin = await User.findOne({
    where: { account: adminAccount, role: "admin" }
  })
  if (!admin) {
    throw new Error("找不到该用户")
  }
  const result = await Building.addAdmin(buildingId, admin.id)
  if (!result) {
    throw new Error("403-目标管理员已为当前宿舍楼的管理员，添加失败")
  }
  ctx.body = new ResBody({ data: { result } })
})

router.del("/removeBuildingAdmin", async ctx => {
  const { adminId, buildingId } = ctx.request.query
  utils.checkParams({ adminId, buildingId })
  const building = await Building.findOne({ where: { id: buildingId } })
  const admin = await User.findOne({ where: { id: adminId } })
  const result = await building.removeAdmin(admin)
  ctx.body = new ResBody({ data: { effectRow: result } })
})

router.get("/getStatistic", async ctx => {
  const { buildingId } = ctx.request.query
  // 获取楼中的所有学生数
  const students = await BuildingController.getStudents(buildingId)

  // 统计专业信息
  const facultyMap = new Map()
  const majorMap = new Map()
  for (let student of students) {
    const facultyId = student.facultyId
    const majorId = student.majorId
    if (facultyMap.has(facultyId)) {
      facultyMap.set(facultyId, {
        name: student.facultyName,
        count: facultyMap.get(facultyId).count + 1
      })
    } else {
      facultyMap.set(facultyId, {
        name: student.facultyName,
        count: 1
      })
    }
    if (majorMap.has(majorId)) {
      majorMap.set(majorId, {
        name: student.majorName,
        count: majorMap.get(majorId).count + 1
      })
    } else {
      majorMap.set(majorId, {
        name: student.majorName,
        count: 1
      })
    }
  }

  ctx.body = new ResBody({
    data: {
      studentCount: students.length,
      sex: {
        boysCount: students.filter(item => item.sex === 0).length,
        girlsCount: students.filter(item => item.sex === 1).length
      },
      faculty: Array.from(facultyMap.values()),
      major: Array.from(majorMap.values())
    }
  })
})

module.exports = router.routes()
