const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Faculty, Major } = require("../model")

const router = new Router()

router.get("/list", async ctx => {
  const faculties = await Faculty.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: Major,
        attributes: ["id", "name"]
      }
    ]
  })
  ctx.body = new ResBody({ data: faculties })
})

module.exports = router.routes()
