const Router = require("koa-router")
const ResBody = require("../struct/ResBody")
const { Evaluate, Room, User } = require("../model")
const { EvaluateController } = require("../controller")
const utils = require("../utils/index")

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

router.post("/addEvaluate", async ctx => {
  const { userId } = ctx.state.user
  const { note, score, roomId } = ctx.request.body
  utils.checkParams({ note, score, roomId })
  const result = await Evaluate.create({ note, score, userId, roomId })
  ctx.body = new ResBody({ data: result })
})

router.delete("/removeEvaluate", async ctx => {
  const { userId } = ctx.state.user
  const { evaluateId } = ctx.request.query
  const evaluate = await Evaluate.findOne({ where: { id: evaluateId } })
  if (evaluate.userId !== userId) {
    throw new Error("无权限删除")
  } else {
    const result = await evaluate.destroy()
    ctx.body = new ResBody({ data: { effectRows: result } })
  }
})

module.exports = router.routes()
