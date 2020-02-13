const { databaseConfig } = require("../config")
const db = require("./index")
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

// 创建表关系
User.hasMany(Token)
User.hasMany(CleanRecord)
User.hasMany(BackRecord)
User.hasMany(GetupRecord)

Room.hasMany(User)
Room.hasMany(CleanRecord)
Room.hasMany(BackRecord)
Room.hasMany(GetupRecord)
Room.hasMany(Evaluate)

Floor.hasMany(Room)

Cleaner.hasMany(Floor)

Building.hasMany(Floor)
Building.hasMany(Room)
Building.hasMany(Cleaner)

Building.belongsToMany(User, { as: "Admins", through: "admins" })
User.belongsToMany(Building, { as: "", through: "admins" })

// 生成默认数据
const { hash } = require("../utils/bcypt")
async function createDefaultData() {
  // 创建一个学生用户
  const student = await User.create({
    account: "123456",
    password: hash("123456"),
    role: "student"
  })
  // 创建一个管理员用户
  const admin = await User.create({
    account: "admin",
    password: hash("123456"),
    role: "admin",
    name: "王晓鹏"
  })
  // 创建一个超级管理员用户
  const superAdmin = await User.create({
    account: "superAdmin",
    password: hash("123456"),
    role: "superAdmin",
    name: "李达康"
  })

  // 创建宿舍楼
  const building = await Building.createBuilding("通天苑")
  // 将创建的宿舍楼与 admin 做关联
  await Building.addAdmin(building.id, admin.id)

  // 创建保洁员
  const cleaner = await Cleaner.createCleaner({
    name: "凉风阿姨",
    phone: "13822222222"
  })
  await Building.addCleaner(building.id, cleaner.id)
}

module.exports = function() {
  // 同步表数据
  console.log("DataBase Syncing ... ...")
  db.sequelize
    .sync({
      force: databaseConfig.rebuild
    })
    .then(() => {
      if (databaseConfig.rebuild) {
        createDefaultData()
      }
    })
}
