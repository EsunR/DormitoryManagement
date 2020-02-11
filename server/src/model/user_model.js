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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    account: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "user"
  }
)

module.exports = User
