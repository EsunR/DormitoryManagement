const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Floor } = require("../model")
const router = new Router()

router.get("/getFloors", async ctx => {
  const { buildingId } = ctx.request.query
  const floors = await Floor.findAll({
    where: { buildingId: buildingId },
    order: [["layer", "DESC"]]
  })
  ctx.body = new ResBody({
    data: { floors }
  })
})

module.exports = router.routes()
