const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const User = require("./user_model")
const Cleaner = require("./cleaner_model")

class Building extends Model {
  static async hasBuilding(id) {
    const building = await Building.findOne({ where: { id } })
    if (building === null) {
      return false
    } else {
      return true
    }
  }
  static async createBuilding({ name }) {
    const building = await Building.create({ name })
    return building
  }
  static async addAdmin(buildingId, userId) {
    try {
      const building = await Building.findOne({ where: { id: buildingId } })
      const user = await User.findOne({ where: { id: userId } })
      const result = await building.addAdmin(user)
      return result
    } catch (e) {
      throw new Error("已存在该管理员，添加失败")
    }
  }
  static async addCleaner(buildingId, cleanerId) {
    try {
      const cleaner = await Cleaner.findOne({ where: { id: cleanerId } })
      cleaner.buildingId = buildingId
      return await cleaner.save()
    } catch (e) {
      throw new Error("添加保洁员失败")
    }
  }
  static async addFloor(buildingId, floor) {
    try {
      floor.buildingId = buildingId
      return await floor.save()
    } catch (error) {
      console.log(error)
    }
  }
}

Building.init(
  {
    name: {
      comment: "楼宇名称",
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "building",
    paranoid: true
  }
)

module.exports = Building
