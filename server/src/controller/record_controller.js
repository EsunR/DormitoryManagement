const { User, GetupRecord, CleanRecord, BackRecord, Room } = require("../model")
const { Op } = require("sequelize")
const moment = require("moment")
const _ = require("lodash")

const getupEarlyPoint = 8
const backEarlyPoint = 22

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
          if (timeHour < getupEarlyPoint) {
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
  async getGetupTableData({
    current,
    step,
    buildingId,
    floorId,
    roomId,
    userId,
    startTime,
    endTime
  }) {
    // 初始化时间
    startTime = startTime
      ? moment(startTime)
          .startOf("day")
          .toDate()
      : moment(0).toDate()
    endTime = endTime
      ? moment(endTime)
          .endOf("day")
          .toDate()
      : moment()
          .endOf("day")
          .toDate()
    console.log("endTime: ", endTime)
    // 开始分情况获取数据
    let result
    if (userId) {
      result = await GetupRecord.findAndCountAll({
        where: {
          userId: userId,
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (roomId) {
      result = await GetupRecord.findAndCountAll({
        where: {
          roomId: roomId,
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (floorId) {
      result = await GetupRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        include: [
          {
            model: Room,
            where: { floorId }
          }
        ],
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (buildingId) {
      result = await GetupRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        include: [
          {
            model: Room,
            where: { buildingId }
          }
        ],
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else {
      result = await GetupRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    }
    const getStudentInfo = require("./user_controller").getStudentInfo
    let rows = []
    for (let record of result.rows) {
      record = record.toJSON()
      delete record.room
      const userInfo = await getStudentInfo(record.userId)
      record = Object.assign(userInfo, record)
      record.time = moment(record.createdAt).format("HH:mm")
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      if (parseInt(moment(record.createdAt).format("HH")) < getupEarlyPoint) {
        record.early = true
      } else {
        record.early = false
      }
      rows.push(record)
    }
    result.rows = rows
    return result
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
          if (timeHour < backEarlyPoint) {
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
  async getBackTableData({
    current,
    step,
    buildingId,
    floorId,
    roomId,
    userId,
    startTime,
    endTime
  }) {
    // 初始化时间
    startTime = startTime
      ? moment(startTime)
          .startOf("day")
          .toDate()
      : moment(0).toDate()
    endTime = endTime
      ? moment(endTime)
          .endOf("day")
          .toDate()
      : moment()
          .endOf("day")
          .toDate()
    // 开始分情况获取数据
    let result
    if (userId) {
      result = await BackRecord.findAndCountAll({
        where: {
          userId: userId,
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (roomId) {
      result = await BackRecord.findAndCountAll({
        where: {
          roomId: roomId,
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (floorId) {
      result = await BackRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        include: [
          {
            model: Room,
            where: { floorId }
          }
        ],
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (buildingId) {
      result = await BackRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        include: [
          {
            model: Room,
            where: { buildingId }
          }
        ],
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else {
      result = await BackRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    }
    const getStudentInfo = require("./user_controller").getStudentInfo
    let rows = []
    for (let record of result.rows) {
      record = record.toJSON()
      delete record.room
      const userInfo = await getStudentInfo(record.userId)
      record = Object.assign(userInfo, record)
      record.time = moment(record.createdAt).format("HH:mm")
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      if (parseInt(moment(record.createdAt).format("HH")) < backEarlyPoint) {
        record.early = true
      } else {
        record.early = false
      }
      rows.push(record)
    }
    result.rows = rows
    return result
  },

  // clean 相关
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
    return await CleanRecord.create({
      userId: user.id,
      roomId: user.roomId
    })
  },
  async getUserCleanRecords(userId, days) {
    // 获取打扫记录不会自动补全每一天的信息
    days = parseInt(days)
    const user = await User.findOne({ where: { id: userId } })
    const roomId = user.roomId
    const room = await Room.findOne({ where: { id: roomId } })
    // 获取最近 days 天的记录
    const startTime = moment()
      .subtract(days - 1 /* -1 代表查询天数包括今天 */, "days")
      .startOf("day")
      .toDate()
    const todayEnd = moment()
      .endOf("day")
      .toDate()
    const records = await CleanRecord.findAll({
      where: {
        userId,
        roomId,
        createdAt: {
          [Op.gt]: startTime,
          [Op.lt]: todayEnd
        }
      },
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      order: [["createdAt", "DESC"]]
    })
    const allRecords = []
    records.forEach(record => {
      record = record.toJSON()
      record.time = moment(record.createdAt).format("HH:mm")
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      record.userName = user.name
      record.roomNumber = room.number
      allRecords.push(record)
    })
    return allRecords
  },
  async getRoomCleanRecords(roomId, days) {
    const room = await Room.findOne({ where: { id: roomId } })
    const startTime = moment()
      .subtract(days - 1 /* -1 代表查询天数包括今天 */, "days")
      .startOf("day")
      .toDate()
    const todayEnd = moment()
      .endOf("day")
      .toDate()
    const records = await room.getCleanRecords({
      where: {
        createdAt: {
          [Op.gt]: startTime,
          [Op.lt]: todayEnd
        }
      },
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      order: [["createdAt", "DESC"]]
    })
    const allRecords = []
    for (let record of records) {
      const user = await record.getUser()
      record = record.toJSON()
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      record.time = moment(record.createdAt).format("HH:mm")
      record.userName = user.name
      record.roomNumber = room.number
      allRecords.push(record)
    }
    return allRecords
  },
  async getCleanTableData({
    current,
    step,
    buildingId,
    floorId,
    roomId,
    userId,
    startTime,
    endTime
  }) {
    // 初始化时间
    startTime = startTime
      ? moment(startTime)
          .startOf("day")
          .toDate()
      : moment(0).toDate()
    endTime = endTime
      ? moment(endTime)
          .endOf("day")
          .toDate()
      : moment()
          .endOf("day")
          .toDate()
    // 开始分情况获取数据
    let result
    if (userId) {
      result = await CleanRecord.findAndCountAll({
        where: {
          userId: userId,
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (roomId) {
      result = await CleanRecord.findAndCountAll({
        where: {
          roomId: roomId,
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (floorId) {
      result = await CleanRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        include: [
          {
            model: Room,
            where: { floorId }
          }
        ],
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else if (buildingId) {
      result = await CleanRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        include: [
          {
            model: Room,
            where: { buildingId }
          }
        ],
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    } else {
      result = await CleanRecord.findAndCountAll({
        where: {
          createdAt: {
            [Op.gt]: startTime,
            [Op.lt]: endTime
          }
        },
        limit: step,
        offset: step * (current - 1),
        order: [["createdAt", "DESC"]]
      })
    }
    const getStudentInfo = require("./user_controller").getStudentInfo
    let rows = []
    for (let record of result.rows) {
      record = record.toJSON()
      delete record.room
      const userInfo = await getStudentInfo(record.userId)
      record = Object.assign(userInfo, record)
      record.time = moment(record.createdAt).format("HH:mm")
      record.date = moment(record.createdAt).format("YYYY-MM-DD")
      record.early = null
      rows.push(record)
    }
    result.rows = rows
    return result
  },

  // 通用
  async getUserProbability(type, userId) {
    const user = await User.findById(userId)
    const startTime = user.checkTime
    let records = []
    let allRecords = []
    switch (type) {
      case "getup":
        allRecords = await user.getGetupRecords({
          where: {
            createdAt: { [Op.gt]: startTime }
          }
        })
        allRecords.forEach(record => {
          let hour = parseInt(moment(record.createdAt).format("HH"))
          if (hour < getupEarlyPoint) {
            records.push(record)
          }
        })
        break
      case "back":
        allRecords = await user.getBackRecords({
          where: {
            createdAt: { [Op.gt]: startTime }
          }
        })
        allRecords.forEach(record => {
          let hour = parseInt(moment(record.createdAt).format("HH"))
          if (hour < backEarlyPoint) {
            records.push(record)
          }
        })
        break
      case "clean":
        records = await user.getCleanRecords({
          where: {
            createdAt: { [Op.gt]: startTime }
          }
        })
        break
      default:
        throw new Error("参数传入错误")
    }
    // 计算从入住到现在有几天了
    const days = Math.abs(moment(startTime).diff(moment(), "days"))
    return (records.length / (days + 1)).toFixed(4)
  }
}
