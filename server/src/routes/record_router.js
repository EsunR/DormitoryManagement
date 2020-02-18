const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const {} = require("../model")
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

module.exports = router.routes()
