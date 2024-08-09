const { Sequelize } = require("sequelize")
const { databaseConfig } = require("../config")

class Db {
  constructor() {
    this.sequelize = this._connect()
  }
  _connect() {
    const { host, name, user, password, port } = databaseConfig
    const sequelize = new Sequelize(name, user, password, {
      host,
      port,
      dialect: "mysql",
      logging: databaseConfig.logging
    })
    return sequelize
  }
  // 数据库连接测试（仅供调试使用）
  connectTest() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Debug：数据连接成功")
      })
      .catch(err => {
        console.error("数据库连接失败:", err)
      })
  }
}

module.exports = new Db()
