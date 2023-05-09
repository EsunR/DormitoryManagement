const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")

class Visitor extends Model {}

Visitor.init(
  {
    name: {
      comment: "访客姓名",
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      comment: "访客电话",
      type: DataTypes.STRING,
      allowNull: false
    },
    idNumber: {
      comment: "访客身份证号",
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      comment: "访客性别, 0：男, 1：女",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "visitor",
    paranoid: true
  }
)

module.exports = Visitor
