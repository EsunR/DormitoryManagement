const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Room, Floor, User, Building } = require("../model")
const router = new Router()

router.get("/getRooms", async ctx => {
  const { floorId, buildingId, layer } = ctx.request.query
  let rooms = []
  if (floorId) {
    rooms = await Room.findAll({ where: { floorId } })
  } else if (buildingId && !layer) {
    rooms = await Room.findAll({ where: { buildingId } })
  } else if (buildingId && layer) {
    const floor = await Floor.findOne({ where: { buildingId, layer } })
    rooms = await Room.findAll({ where: { floorId: floor.id } })
  } else {
    rooms = await Room.findAll()
  }
  // 计算每个房间当前的人数
  for (let index in rooms) {
    const room = rooms[index]
    const roomId = room.id
    const currentPeopleNum = await User.count({ where: { roomId } })
    room.dataValues.currentPeopleNum = currentPeopleNum
    room.dataValues.isFull = Boolean(currentPeopleNum === room.peopleNum)
  }
  ctx.body = new ResBody({
    data: { rooms }
  })
})

router.get("/getRoomInfo", async ctx => {
  const { roomId } = ctx.request.query
  const roomInfo = await Room.findOne({
    where: { id: roomId },
    include: [{ model: Floor }, { model: Building }, { model: User }]
  })
  ctx.body = new ResBody({ data: roomInfo })
})

router.post("/updateInfo", async ctx => {
  const { roomId } = ctx.request.body
  const room = await Room.findOne({ where: { id: roomId } })
  const reqBody = ctx.request.body
  for (let key in reqBody) {
    if (
      Object.hasOwnProperty.call(room.toJSON(), key) &&
      ![undefined, null, ""].includes(reqBody[key])
    ) {
      room[key] = reqBody[key]
    }
  }
  ctx.body = new ResBody({ data: await room.save() })
})

module.exports = router.routes()
