const db = require("./index")
const User = require("../model/user_model")
const Token = require("../model/token_model")

User.hasMany(Token)

module.exports = function() {
  console.log("DataBase Syncing ... ...")
  db.sequelize.sync({
    // force: true // 开启重建表，在正式环境下设置为 false
  })
}
