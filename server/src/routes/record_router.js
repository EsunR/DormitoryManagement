const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { RecordController } = require("../controller")

const router = new Router()

router.post("/addRecord", async ctx => {
  const { userId } = ctx.state.user
  const { type } = ctx.request.body
  switch (type) {
    case "getup":
      await RecordController.addGetupRecord(userId)
      break
    case "back":
      await RecordController.addBackRecord(userId)
      break
    case "clean":
      await RecordController.addCleanRecord(userId)
      break
    default:
      throw new Error("添加失败，请检查传入参数的类型")
  }
  ctx.body = new ResBody({ data: { done: true, type } })
})

router.get("/getUserRecords", async ctx => {
  let { type, userId, days, pure } = ctx.request.query
  pure = pure === "true" ? true : false
  let records = []
  switch (type) {
    case "getup":
      records = await RecordController.getUserGetupRecords(userId, days, pure)
      break
    case "back":
      records = await RecordController.getUserBackRecords(userId, days, pure)
      break
    case "clean":
      records = await RecordController.getUserCleanRecords(userId, days)
      break
    default:
      throw new Error("查询失败，请检查传入参数的类型")
  }
  ctx.body = new ResBody({ data: { records, type } })
})

router.get("/getRoomRecords", async ctx => {
  let { type, roomId, days, pure } = ctx.request.query
  pure = pure === "true" ? true : false
  let records = []
  switch (type) {
    case "getup":
      records = await RecordController.getRoomGetupRecords(roomId, days, pure)
      break
    case "back":
      records = await RecordController.getRoomBackRecords(roomId, days, pure)
      break
    case "clean":
      records = await RecordController.getRoomCleanRecords(roomId, days)
      break
    default:
      throw new Error("查询失败，请检查传入参数的类型")
  }
  ctx.body = new ResBody({ data: { records, type } })
})

router.get("/getLineChartData", async ctx => {
  const { type, roomId } = ctx.request.query
  let charData = []
  switch (type) {
    case "getup":
      charData = await RecordController.getGetupRecordLineCharData(roomId)
      break
    case "back":
      charData = await RecordController.getBackRecordLineCharData(roomId)
      break
    default:
      throw new Error("查询失败，请检查传入参数的类型")
  }
  ctx.body = new ResBody({ data: { charData, type } })
})

router.get("/getUserProbability", async ctx => {
  let { userId } = ctx.request.query
  if (userId === null || userId === undefined) {
    userId = ctx.state.user.userId
  }
  const getup = await RecordController.getUserProbability("getup", userId)
  const back = await RecordController.getUserProbability("back", userId)
  const clean = await RecordController.getUserProbability("clean", userId)
  ctx.body = new ResBody({ data: { getup, back, clean } })
})

router.get("/getRecordTableData", async ctx => {
  let {
    type,
    current,
    step,
    buildingId,
    floorId,
    roomId,
    userId,
    startTime,
    endTime
  } = ctx.request.query
  // 调整默认参数
  if (!type) {
    throw new Error("参数错误，没有type")
  }
  current = current ? parseInt(current) : 1
  step = step ? parseInt(step) : 10
  startTime = startTime ? parseInt(startTime) : undefined
  endTime = endTime ? parseInt(endTime) : undefined
  let data = {
    count: 0,
    rows: []
  }
  switch (type) {
    case "getup":
      data = await RecordController.getGetupTableData({
        current,
        step,
        buildingId,
        floorId,
        roomId,
        userId,
        startTime,
        endTime
      })
      break
    case "back":
      data = await RecordController.getBackTableData({
        current,
        step,
        buildingId,
        floorId,
        roomId,
        userId,
        startTime,
        endTime
      })
      break
    case "clean":
      data = await RecordController.getCleanTableData({
        current,
        step,
        buildingId,
        floorId,
        roomId,
        userId,
        startTime,
        endTime
      })
      break
    default:
      break
  }
  ctx.body = new ResBody({
    data: { current, step, type, count: data.count, rows: data.rows }
  })
})

module.exports = router.routes()
