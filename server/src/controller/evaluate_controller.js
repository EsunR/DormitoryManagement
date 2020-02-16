const _ = require("lodash")
const { User } = require("../model")

module.exports = {
  async getEvaluatesInfo(evaluates) {
    const cpEvaluates = _.cloneDeep(evaluates)
    for (let evaluate of cpEvaluates) {
      const creator = await evaluate.getUser()
      evaluate.dataValues.userName = creator.name
    }
    return cpEvaluates
  }
}
