const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const User = require("./user_model")

class Building extends Model {
  static async hasBuilding(id) {
    const building = await Building.findOne({ where: { id } })
    if (building === null) {
      return false
    } else {
      return true
    }
  }
  static async createBuilding({ name, layers }) {
    const building = await Building.create({ name, layers })
    return building
  }
  static async addAdmin(buildingId, userId) {
    try {
      const building = await Building.findOne({ where: { id: buildingId } })
      const user = await User.findOne({ where: { id: userId } })
      return building.addAdmin(user)
    } catch (e) {
      throw new Error("添加管理员失败")
    }
  }
  static async addCleaner(buildingId, cleanerId) {
    try {
      const building = await Building.findOne({ where: { id: buildingId } })
      building.cleanerId = cleanerId
      return building.save()
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
    },
    layers: {
      comment: "楼层层数",
      type: DataTypes.INTEGER,
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
