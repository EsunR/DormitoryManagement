const { Floor } = require("../model")

module.exports = {
  getStudents: async function(floorId) {
    const { getStudentInfo } = require("./user_controller")
    let users = []
    const floor = await Floor.findOne({ where: { id: floorId } })
    const rooms = await floor.getRooms()
    for (let room of rooms) {
      const roomUsers = await room.getUsers()
      for (let user of roomUsers) {
        users.push(await getStudentInfo(user.id))
      }
    }
    return users
  }
}
