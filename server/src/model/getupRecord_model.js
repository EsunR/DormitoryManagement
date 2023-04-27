const db = require("../db/index")
const { Model } = require("sequelize")

class GetupRecord extends Model {}

GetupRecord.init(
  {},
  {
    sequelize: db.sequelize,
    modelName: "getupRecord",
    paranoid: true
  }
)

module.exports = GetupRecord
