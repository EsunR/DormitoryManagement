const { User, GetupRecord, CleanRecord, BackRecord, Room } = require("../model")
const { Op } = require("sequelize")
const moment = require("moment")
const _ = require("lodash")

module.exports = {
  // getup 相关
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
  async getUserGetupRecords(userId, days, pure = false) {
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
      } else if (!record && !pure) {
        // 如果获取的是全部数据且当前天无数据
        // 就建立一条空记录
        record = GetupRecord.build({
          id: "fake" + i,
          roomId,
          userId,
          createdAt: todayStart
        }).toJSON()
        record.time = null
      } else {
        continue
      }
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      record.userName = user.name
      record.roomNumber = room.number
      allRecords.push(record)
    }
    return allRecords.reverse()
  },
  async getRoomGetupRecords(roomId, days, pure = false) {
    days = parseInt(days)
    const room = await Room.findOne({ where: { id: roomId } })
    const users = await room.getUsers()
    const records = {}
    for (let user of users) {
      records[user.name] = await this.getUserGetupRecords(user.id, days, pure)
    }
    return records
  },
  async getGetupRecordLineCharData(roomId) {
    const room = await Room.findOne({ where: { id: roomId } })
    const users = await room.getUsers()
    const data = { columns: ["周期"], rows: [] }
    const dataCount = 5 // 获取的记录条数
    const dataStep = 7 // 每条记录相隔的条数
    // 初始化记录值
    for (let i = 0; i < dataCount; i++) {
      data.rows.push({ 周期: `最近${(i + 1) * dataStep}天` })
    }
    // 遍历当前宿舍的用户
    for (let user of users) {
      data.columns.push(user.name)
      for (let i = 0; i < dataCount; i++) {
        const days = (i + 1) * dataStep
        // 获取某学生最近 days 天的早起记录
        const records = await this.getUserGetupRecords(user.id, days, true)
        let earlyTimes = 0
        records.forEach(record => {
          // 统计这些记录中有几天是早起的
          const timeHour = parseInt(moment(record.createdAt).format("HH"))
          if (timeHour < 8) {
            earlyTimes++
          }
        })
        // 计算早起率
        const probability = (earlyTimes / days).toFixed(4)
        data.rows[i][user.name] = probability
      }
    }
    return data
  },

  // back 相关
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
  async getUserBackRecords(userId, days, pure = false) {
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
      let record = await BackRecord.findOne({
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
      } else if (!record && !pure) {
        // 如果获取的是全部数据且当前天无数据
        // 就建立一条空记录
        record = BackRecord.build({
          id: "fake" + i,
          roomId,
          userId,
          createdAt: todayStart
        }).toJSON()
        record.time = null
      } else {
        continue
      }
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      record.userName = user.name
      record.roomNumber = room.number
      allRecords.push(record)
    }
    return allRecords.reverse()
  },
  async getRoomBackRecords(roomId, days, pure = false) {
    days = parseInt(days)
    const room = await Room.findOne({ where: { id: roomId } })
    const users = await room.getUsers()
    const records = {}
    for (let user of users) {
      records[user.name] = await this.getUserBackRecords(user.id, days, pure)
    }
    return records
  },
  async getBackRecordLineCharData(roomId) {
    const room = await Room.findOne({ where: { id: roomId } })
    const users = await room.getUsers()
    const data = { columns: ["周期"], rows: [] }
    const dataCount = 5 // 获取的记录条数
    const dataStep = 7 // 每条记录相隔的条数
    // 初始化记录值
    for (let i = 0; i < dataCount; i++) {
      data.rows.push({ 周期: `最近${(i + 1) * dataStep}天` })
    }
    // 遍历当前宿舍的用户
    for (let user of users) {
      data.columns.push(user.name)
      for (let i = 0; i < dataCount; i++) {
        const days = (i + 1) * dataStep
        // 获取某学生最近 days 天的归宿记录
        const records = await this.getUserBackRecords(user.id, days, true)
        let earlyTimes = 0
        records.forEach(record => {
          // 统计这些记录中有几天是早归的
          const timeHour = parseInt(moment(record.createdAt).format("HH"))
          if (timeHour < 22) {
            earlyTimes++
          }
        })
        // 计算早起率
        const probability = (earlyTimes / days).toFixed(4)
        data.rows[i][user.name] = probability
      }
    }
    return data
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
  }
}
