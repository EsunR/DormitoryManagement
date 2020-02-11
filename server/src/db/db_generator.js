const db = require("./index")
const User = require("../model/user_model")
const Token = require("../model/token_model")

User.hasMany(Token)

module.exports = function() {
  db.sequelize.sync()
}
