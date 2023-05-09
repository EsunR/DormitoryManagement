const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Visitor, Building } = require("../model")

const router = new Router()

router.post("/create", async ctx => {
  const { name, phone, idNumber, sex, buildingId } = ctx.request.body
  const visitor = await Visitor.create({
    name,
    phone,
    idNumber,
    sex,
    buildingId
  })
  ctx.body = new ResBody({ data: visitor })
})

router.get("/list", async ctx => {
  let { current, step } = ctx.request.query
  current = current ? parseInt(current) : 1
  step = step ? parseInt(step) : 10
  let data = await Visitor.findAndCountAll({
    include: [{ model: Building }],
    offset: (current - 1) * step,
    limit: step,
    order: [["createdAt", "DESC"]]
  })
  ctx.body = new ResBody({ data })
})

module.exports = router.routes()
