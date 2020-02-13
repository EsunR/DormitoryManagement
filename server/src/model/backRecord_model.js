const db = require("../db/index")
const { Model } = require("sequelize")

class BackRecord extends Model {}

BackRecord.init(
  {},
  {
    sequelize: db.sequelize,
    modelName: "back_record",
    paranoid: true
  }
)

module.exports = BackRecord
