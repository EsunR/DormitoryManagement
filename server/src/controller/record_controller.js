const { User, GetupRecord, CleanRecord, BackRecord, Room } = require("../model")
const { Op } = require("sequelize")
const moment = require("moment")
const _ = require("lodash")

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
        record.time = moment(record.createdAt).format("HH:mm")
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
    return allRecords.reverse()
  },
  async getRoomGetupRecords(roomId, days) {
    days = parseInt(days)
    const room = await Room.findOne({ where: { id: roomId } })
    const users = await room.getUsers()
    const records = {}
    for (let user of users) {
      records[user.name] = await this.getUserGetupRecords(user.id, days)
    }
    return records
  }
}
