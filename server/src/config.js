const sysConfig = {
  port: 8080,
  pwdSaltRound: 10,
  tokenSalt: "awsl",
  tokenExp: 3600 * 24 * 14, // 14 Days
  maxDevice: 3
}

const databaseConfig = {
  host: "localhost",
  name: "dormitory",
  user: "root",
  password: "root"
}

module.exports = {
  sysConfig,
  databaseConfig
}
