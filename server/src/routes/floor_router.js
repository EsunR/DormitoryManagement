const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Floor, Cleaner, Room } = require("../model")
const router = new Router()

router.get("/getFloors", async ctx => {
  const { buildingId } = ctx.request.query
  const floors = await Floor.findAll({
    where: { buildingId: buildingId },
    order: [["layer", "ASC"]]
  })
  ctx.body = new ResBody({
    data: { floors }
  })
})

router.get("/getFloorsDetail", async ctx => {
  const { buildingId } = ctx.request.query
  const floors = await Floor.findAll({
    where: { buildingId: buildingId },
    order: [["layer", "ASC"]],
    include: [
      {
        model: Cleaner
      },
      {
        model: Room
      }
    ]
  })
  // 获取宿舍人数
  for (let floor of floors) {
    for (let room of floor.rooms) {
      room.setDataValue("studentCount", (await room.getUsers()).length)
    }
  }
  ctx.body = new ResBody({
    data: { floors, count: floors.length }
  })
})

router.post("/addCleanerToFloor", async ctx => {
  let { floorId, cleanerId } = ctx.request.body
  if (cleanerId === "") {
    cleanerId = null
  }
  const floor = await Floor.findOne({ where: { id: floorId } })
  floor.cleanerId = cleanerId
  const result = await floor.save()
  ctx.body = new ResBody({ data: result })
})

module.exports = router.routes()
