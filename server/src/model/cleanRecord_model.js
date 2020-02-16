const db = require("../db/index")
const { Model } = require("sequelize")

class CleanRecord extends Model {}

CleanRecord.init(
  {},
  {
    sequelize: db.sequelize,
    modelName: "cleanRecord",
    paranoid: true
  }
)

module.exports = CleanRecord
