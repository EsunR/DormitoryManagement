const db = require("../db/index")
const { Model } = require("sequelize")

class GetupRedcord extends Model {}

GetupRedcord.init(
  {},
  {
    sequelize: db.sequelize,
    modelName: "getup_record",
    paranoid: true
  }
)

module.exports = GetupRedcord
