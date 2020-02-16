const { User } = require("../model")

module.exports = {
  async getStudents(roomId) {
    const { getStudentsInfo } = require("./user_controller")
    const users = await User.findAll({ where: { roomId } })
    return await getStudentsInfo(users)
  }
}
