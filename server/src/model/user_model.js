const db = require("../db/index")
const { DataTypes, Model } = require("sequelize")
const bcypt = require("../utils/bcypt")

class User extends Model {
  static createUser(account, password) {
    const user = User.build({ account, password: bcypt.hash(password) })
    return user.save()
  }
  static findByAccount(account) {
    return User.findOne({ where: { account } })
  }
  static findById(id) {
    return User.findOne({ where: { id } })
  }
}

User.init(
  {
    // User 表的 id 必须创建，否则 account 会被代替为用户 id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "student" // 可能值：student admin superAdmin
    },
    name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    sex: {
      comment: "性别, 0：男, 1：女",
      type: DataTypes.INTEGER
    },
    checkTime: {
      comment: "入住宿舍时间",
      type: DataTypes.DATE
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "user",
    paranoid: true
  }
)

module.exports = User
