const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Building } = require("../model")
const router = new Router()

router.get("/getBuildings", async ctx => {
  const buildings = await Building.findAll()
  ctx.body = new ResBody({
    data: {
      buildings
    }
  })
})

module.exports = router.routes()
