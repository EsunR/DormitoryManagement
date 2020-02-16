const { User, GetupRecord, CleanRecord, BackRecord, Room } = require("../model")
const { Op } = require("sequelize")
const moment = require("moment")
const _ = require("lodash")

// /**
//  * 将记录补全
//  * 如获取完整的 2020.2.16 ~ 2020.2.25 之间的记录，
//  * 但是当前的数据库记录只有 2.17、2.18 的记录，
//  * 使用该方法可以产生完整的 2020.2.16 ~ 2020.2.25 之间的记录
//  * 没有记录的日期记录值将被填为空
//  * @param {Array} records 非完整的记录数组
//  * @param {Date} startTime 补全记录的起始时间
//  * @param {*} endTiem 补全记录的终止时间
//  */
// function getFullRecords(records, startTime, endTiem) {
//   if (!(endTiem instanceof Date)) {
//     endTiem = new Date()
//   }
//   // 保证开始时间与结束时间为极限值
//   startTime = moment(startTime).startOf("day").toDate()
//   endTiem = moment(endTiem).endOf("day").toDate()
//   const cpRecords = _.cloneDeep(records)
//   const userId = cpRecords[0].userId
//   const roomId = cpRecords[0].roomId
//   const user = User.findOne({ where: { id: userId } })
//   const room = Room.findOne({ where: { id: roomId } })
//   const result = []
//   // 处理数据，为数据添加 data 字段与 time 字段，分别表示日期与时间
//   cpRecords.forEach(record => {
//     record.userName = user.name
//     record.roomNumber = room.number
//     const momentTime = moment(record.createdAt)
//     record.date = momentTime.format("YYYY-MM-DD")
//     record.time = momentTime.format("HH:MM")
//     const time =
//   })
// }

module.exports = {
  async addGetupRecord(userId) {
    const user = await User.findOne({ where: { id: userId } })
    const todyRecord = await GetupRecord.findOne({
      where: {
        userId: user.id,
        roomId: user.roomId,
        createdAt: {
          [Op.gt]: moment()
            .startOf("day")
            .toDate(),
          [Op.lt]: moment()
            .endOf("day")
            .toDate()
        }
      }
    })
    if (todyRecord) {
      throw new Error("当天已经有记录，记录失败!")
    }
    return await GetupRecord.create({ userId: user.id, roomId: user.roomId })
  },
  async addBackRecord(userId) {
    const user = await User.findOne({ where: { id: userId } })
    const todyRecord = await BackRecord.findOne({
      where: {
        userId: user.id,
        roomId: user.roomId,
        createdAt: {
          [Op.gt]: moment()
            .startOf("day")
            .toDate(),
          [Op.lt]: moment()
            .endOf("day")
            .toDate()
        }
      }
    })
    if (todyRecord) {
      throw new Error("当天已经有记录，记录失败!")
    }
    return await BackRecord.create({ userId: user.id, roomId: user.roomId })
  },
  async addCleanRecord(userId) {
    const user = await User.findOne({ where: { id: userId } })
    const todyRecord = await CleanRecord.findOne({
      where: {
        roomId: user.roomId,
        createdAt: {
          [Op.gt]: moment()
            .startOf("day")
            .toDate(),
          [Op.lt]: moment()
            .endOf("day")
            .toDate()
        }
      }
    })
    if (todyRecord) {
      throw new Error("当天已经有清扫记录，记录失败")
    }
    return await BackRecord.create({ userId: user.id, roomId: user.roomId })
  },
  async getUserGetupRecords(userId, days) {
    days = parseInt(days)
    const user = await User.findOne({ where: { id: userId } })
    const roomId = user.roomId
    const room = await Room.findOne({ where: { id: roomId } })
    // 获取最近 days 天的记录
    const startTime = moment()
      .subtract(days - 1 /* -1 代表查询天数包括今天 */, "days")
      .startOf("day")
      .toDate()
    const allRecords = []
    for (let i = 0; i < days; i++) {
      const todayStart = moment(startTime)
        .add(i, "days")
        .toDate()
      const todayEnd = moment(todayStart)
        .endOf("day")
        .toDate()
      let record = await GetupRecord.findOne({
        where: {
          userId,
          roomId,
          createdAt: {
            [Op.gt]: todayStart,
            [Op.lt]: todayEnd
          }
        },
        attributes: { exclude: ["updatedAt", "deletedAt"] }
      })
      if (record) {
        // 如果当天有记录就推入结果
        record = record.toJSON()
        record.time = moment(record.createdAt).format("HH:MM")
      } else {
        // 否则建立一条空记录
        record = GetupRecord.build({
          id: "fake" + i,
          roomId,
          userId,
          createdAt: todayStart
        }).toJSON()
        record.time = null
      }
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      record.userName = user.name
      record.roomNumber = room.number
      allRecords.push(record)
    }
    return allRecords
  }
}
