const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const Building = require("./building_model")

class Room extends Model {
  static async createRoom({
    number,
    status = 1,
    floorId,
    buildingId,
    peopleNum = 6
  }) {
    try {
      return await Room.create({
        number,
        status,
        floorId,
        buildingId,
        peopleNum
      })
    } catch (error) {
      console.log(error)
      throw new Error("创建房间失败")
    }
  }
}

Room.init(
  {
    number: {
      type: DataTypes.INTEGER,
      comment: "房间号",
      unique: "compositeIndex"
    },
    buildingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Building,
        key: "id"
      },
      unique: "compositeIndex"
    },
    status: {
      comment: "宿舍状态，可入住为1，不可入住为2",
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    peopleNum: {
      comment: "房间最大人数",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "room",
    paranoid: true
  }
)

module.exports = Room
