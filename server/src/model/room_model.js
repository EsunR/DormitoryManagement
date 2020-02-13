const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const Building = require("../model/building_model")

class Room extends Model {}

Room.init(
  {
    number: {
      type: DataTypes.INTEGER,
      comment: "房间号",
      unique: "compositeIndex"
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      comment: "宿舍状态，可入住为1，不可入住为2"
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
    modelName: "room",
    paranoid: true
  }
)

module.exports = Room
