const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")

class Major extends Model {}

Major.init(
  {
    name: {
      comment: "专业名称",
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "major",
    paranoid: true
  }
)

module.exports = Major
