const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")

class Evaluate extends Model {}

Evaluate.init(
  {
    score: {
      comment: "评价分数",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    note: {
      comment: "评价备注",
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "evaluate",
    paranoid: true
  }
)

module.exports = Evaluate
