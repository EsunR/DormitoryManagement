const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const Building = require("../model/building_model")

class Floor extends Model {}

Floor.init(
  {
    number: {
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
      allowNull: false,
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
