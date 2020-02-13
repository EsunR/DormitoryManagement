const db = require("../db/index")
const { Model } = require("sequelize")
const { sysConfig } = require("../config")
const User = require("./user_model")
const { getToken } = require("../utils/jwt")

class Token extends Model {
  static async createToken(userId) {
    // 1. 列出数据库已有token
    const tokens = await Token.findAll({ where: { userId } })
    // 2. 对比Token条数与设置的设备数，如果超出数量限制，删除最早的Token
    if (tokens.length >= sysConfig.maxDevice) {
      for (let i = 0; i <= tokens.length - sysConfig.maxDevice; i++) {
        await tokens[i].destroy()
      }
    }
    // 3. 生成一条记录并返回这条记录
    const token = await Token.build({ userId }).save()
    const user = await User.findById(userId)
    return (
      "Bearer " +
      getToken({ userId: user.id, tokenId: token.id, role: user.role })
    )
  }

  static async hasToken(tokenId) {
    const token = await Token.findOne({ where: { id: tokenId } })
    if (token === null) {
      return false
    } else {
      return true
    }
  }

  static async deleteById(tokenId) {
    await Token.destroy({ where: { id: tokenId } })
  }
}

Token.init(
  {},
  {
    sequelize: db.sequelize,
    modelName: "token"
  }
)

module.exports = Token
