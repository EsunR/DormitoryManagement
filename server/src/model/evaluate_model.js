const { sequelize } = require("../db/index")
const { DataTypes, Model } = require("sequelize")

class Evaluate extends Model {
  static async createEvaluate({ score, note = "", userId, roomId }) {
    return await Evaluate.create({ score, note, userId, roomId })
  }
}

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
