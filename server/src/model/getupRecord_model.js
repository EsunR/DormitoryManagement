const db = require("../db/index")
const { Model } = require("sequelize")

class GetupRedcord extends Model {}

GetupRedcord.init(
  {},
  {
    sequelize: db.sequelize,
    modelName: "getupRecord",
    paranoid: true
  }
)

module.exports = GetupRedcord
