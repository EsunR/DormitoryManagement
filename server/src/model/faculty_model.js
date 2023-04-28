const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")

class Faculty extends Model {}

Faculty.init(
  {
    name: {
      comment: "院系名称",
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "faculty",
    paranoid: true
  }
)

module.exports = Faculty
