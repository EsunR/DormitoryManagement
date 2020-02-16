const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Evaluate, Room, User } = require("../model")
const { EvaluateController } = require("../controller")

const router = new Router()

router.get("/getEvaluates", async ctx => {
  const { roomId, userId } = ctx.request.query
  let evaluates = []
  if (roomId) {
    // 由房间id查询评价信息
    const room = await Room.findOne({ where: { id: roomId } })
    evaluates = await room.getEvaluates()
  } else if (userId) {
    const user = await User.findOne({ where: { id: userId } })
    evaluates = await user.getEvaluates()
  }
  ctx.body = new ResBody({
    data: { evaluates: await EvaluateController.getEvaluatesInfo(evaluates) }
  })
})

module.exports = router.routes()
