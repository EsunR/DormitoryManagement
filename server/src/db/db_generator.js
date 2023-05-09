const moment = require("moment")
const { databaseConfig } = require("../config")
const db = require("./index")
const { FACULTY_MAJOR_DATA } = require("./constance")
const User = require("../model/user_model")
const Token = require("../model/token_model")
const CleanRecord = require("../model/cleanRecord_model")
const BackRecord = require("../model/backRecord_model")
const GetupRecord = require("../model/getupRecord_model")
const Room = require("../model/room_model")
const Floor = require("../model/floor_model")
const Building = require("../model/building_model")
const Cleaner = require("../model/cleaner_model")
const Evaluate = require("../model/evaluate_model")
const Faculty = require("../model/faculty_model")
const Major = require("../model/major_model")
const Visitor = require("../model/visitor_model")

// 创建表关系
User.hasMany(Token)
User.hasMany(CleanRecord)
User.hasMany(BackRecord)
User.hasMany(GetupRecord)
User.hasMany(Evaluate)
User.belongsTo(Room)

Room.hasMany(User)
Room.hasMany(CleanRecord)
Room.hasMany(BackRecord)
Room.hasMany(GetupRecord)
Room.hasMany(Evaluate)
Room.belongsTo(Floor)
Room.belongsTo(Building)

Evaluate.belongsTo(User)
Evaluate.belongsTo(Room)

CleanRecord.belongsTo(User)
CleanRecord.belongsTo(Room)

GetupRecord.belongsTo(User)
GetupRecord.belongsTo(Room)

BackRecord.belongsTo(User)
BackRecord.belongsTo(Room)

Floor.hasMany(Room)
Floor.belongsTo(Building)
Floor.belongsTo(Cleaner)

Cleaner.hasMany(Floor)
Cleaner.belongsTo(Building)

Building.hasMany(Floor)
Building.hasMany(Room)
Building.hasMany(Cleaner)

Building.belongsToMany(User, { as: "Admins", through: "admins" })
User.belongsToMany(Building, { as: "", through: "admins" })

Faculty.hasMany(Major)
User.belongsTo(Faculty)
User.belongsTo(Major)

Visitor.belongsTo(Building)

// 生成默认数据
const { hash } = require("../utils/bcypt")
async function createDefaultData() {
  // 添加院系与专业
  FACULTY_MAJOR_DATA.map(async item => {
    const faculty = await Faculty.create({
      name: item.faculty
    })
    item.majors.map(async m => {
      await Major.create({
        name: m,
        facultyId: faculty.id
      })
    })
  })

  // 创建一个新用户
  const user = await User.create({
    account: "test",
    password: hash("123456"),
    role: "student"
  })

  // 创建一个管理员用户
  const admin = await User.create({
    account: "admin",
    password: hash("123456"),
    role: "admin",
    name: "王磊"
  })
  // 创建一个超级管理员用户
  const superAdmin = await User.create({
    account: "superAdmin",
    password: hash("123456"),
    role: "superAdmin",
    name: "李明"
  })

  // 创建宿舍楼
  const building = await Building.createBuilding({
    name: "梧桐苑"
  })
  await Building.createBuilding({
    name: "紫藤苑"
  })
  // 将创建的宿舍楼与 admin 做关联
  await Building.addAdmin(building.id, admin.id)

  await Visitor.create({
    name: "张三",
    phone: "13822222222",
    idNumber: "123456789012345678",
    sex: 1,
    buildingId: building.id
  })

  // 创建保洁员
  const cleaner = await Cleaner.createCleaner({
    name: "王阿姨",
    phone: "13822222222"
  })
  // 为宿舍楼添加保洁员
  await Building.addCleaner(building.id, cleaner.id)

  // 创建楼层
  for (let i = 0; i < 10; i++) {
    const layer = i + 1
    const floor = await Floor.createFloor({
      layer,
      buildingId: null
    })
    await Building.addFloor(building.id, floor)
  }

  // 创建宿舍
  const floor = await Floor.findOne({
    where: { buildingId: building.id, layer: 1 }
  })
  const room = await Room.createRoom({
    number: 101,
    floorId: floor.id,
    buildingId: floor.buildingId
  })

  Room.createRoom({
    number: 102,
    floorId: floor.id,
    buildingId: floor.buildingId
  })

  // 为宿舍添加多个学生
  const student_1 = await User.create({
    account: "student1",
    password: hash("123456"),
    name: "刘涛",
    role: "student",
    phone: "123456789011",
    roomId: room.id,
    checkTime: new Date(),
    sex: 0,
    facultyId: 1,
    majorId: 1
  })
  const student_2 = await User.create({
    account: "student2",
    password: hash("123456"),
    name: "陈华",
    role: "student",
    phone: "123456789011",
    roomId: room.id,
    checkTime: new Date(),
    sex: 0,
    facultyId: 1,
    majorId: 1
  })

  // 创建评价
  const evaluate = await Evaluate.createEvaluate({
    score: 98,
    note: "宿舍不错，干净又卫生",
    userId: admin.id,
    roomId: room.id
  })

  // 添加打卡记录
  for (let i = 0; i < 35; i++) {
    GetupRecord.create({
      userId: student_1.id,
      roomId: room.id,
      createdAt: moment()
        .add(-i, "days")
        .hour(parseInt(Math.random() * 4 + 6))
        .minute(parseInt(Math.random() * 60))
        .toDate()
    })
    GetupRecord.create({
      userId: student_2.id,
      roomId: room.id,
      createdAt: moment()
        .add(-i, "days")
        .hour(parseInt(Math.random() * 4 + 6))
        .minute(parseInt(Math.random() * 60))
        .toDate()
    })
  }
}

module.exports = async function (force = false) {
  // 同步表数据
  console.log("DataBase Syncing ... ...")
  await db.sequelize.sync({ force })
  console.log("DataBase Sync done")
  if (force) {
    console.log("DataBase Init ... ...");
    await createDefaultData()
  }
}
