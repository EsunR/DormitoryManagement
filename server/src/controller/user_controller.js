const { User } = require("../model")
const _ = require("lodash")

module.exports = {
  /**
   * 获取学生用户的完整信息
   * @param {Number} userId
   */
  async getStudentInfo(userId) {
    const student = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password", "deletedAt"] }
    })
    const room = await student.getRoom()
    const floor = await room.getFloor()
    const building = await floor.getBuilding()
    const info = Object.assign(student.dataValues, {
      roomNumber: room.number,
      floorId: floor.id,
      floorLayer: floor.layer,
      buildingId: building.id,
      buildingName: building.name
    })
    return info
  },
  /**
   * 获取学生用户们的完整信息
   * @param {Array} users
   */
  async getStudentsInfo(users) {
    const cloneUsers = _.cloneDeep(users)
    for (let user of cloneUsers) {
      delete user.dataValues.password
      delete user.dataValues.deletedAt
      const room = await user.getRoom()
      const floor = await room.getFloor()
      const building = await floor.getBuilding()
      Object.assign(user.dataValues, {
        roomNumber: room.number,
        floorId: floor.id,
        floorLayer: floor.layer,
        buildingId: building.id,
        buildingName: building.name
      })
    }
    return cloneUsers
  }
}
