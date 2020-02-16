const db = require("../db/index")
const { Model } = require("sequelize")

class BackRecord extends Model {}

BackRecord.init(
  {},
  {
    sequelize: db.sequelize,
    modelName: "backRecord",
    paranoid: true
  }
)

module.exports = BackRecord
