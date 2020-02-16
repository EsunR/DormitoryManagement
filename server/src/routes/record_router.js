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
  ctx.body = new ResBody({})
})

router.get("/getUserRecords", async ctx => {
  const { type, userId, days } = ctx.request.query
  let records = []
  switch (type) {
    case "getup":
      records = await RecordController.getUserGetupRecords(userId, days)
      break
    default:
      throw new Error("查询失败，请检查传入参数的类型")
  }
  ctx.body = new ResBody({ data: records })
})

module.exports = router.routes()
