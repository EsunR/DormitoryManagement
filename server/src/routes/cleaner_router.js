const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Cleaner } = require("../model")
const {} = require("../controller")
const utils = require("../utils/index.js")

const router = new Router()

router.post("/addCleaner", async ctx => {
  const { name, phone, buildingId } = ctx.request.body
  utils.checkParams({ name, phone, buildingId })
  const newCleaner = await Cleaner.create({ name, phone, buildingId })
  ctx.body = new ResBody({ data: newCleaner })
})

router.delete("/delCleaner", async ctx => {
  const { cleanerId } = ctx.request.query
  const result = await Cleaner.destroy({ where: { id: cleanerId } })
  ctx.body = new ResBody({ data: { effectRow: result } })
})

module.exports = router.routes()
