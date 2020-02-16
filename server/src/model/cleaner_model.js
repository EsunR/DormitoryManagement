const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")

class Cleaner extends Model {
  static async createCleaner({ name, phone, buildingId }) {
    return await Cleaner.create({ name, phone, buildingId })
  }
}

Cleaner.init(
  {
    name: {
      comment: "保洁员姓名",
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      comment: "保洁员电话",
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "cleaner",
    paranoid: true
  }
)

module.exports = Cleaner
