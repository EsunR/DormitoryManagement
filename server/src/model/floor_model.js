const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const Building = require("./building_model")

class Floor extends Model {
  static async createFloor({ layer, buildingId }) {
    try {
      const floor = await Floor.create({ layer, buildingId })
      return floor
    } catch (e) {
      console.log(e)
      throw new Error("创建楼层失败")
    }
  }
}

Floor.init(
  {
    layer: {
      type: DataTypes.INTEGER,
      comment: "楼层",
      unique: "compositeIndex"
    },
    buildingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Building,
        key: "id"
      },
      unique: "compositeIndex"
    }
  },
  {
    sequelize,
    modelName: "floor",
    paranoid: true
  }
)

module.exports = Floor
