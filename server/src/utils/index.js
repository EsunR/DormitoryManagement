module.exports = {
  checkParams(paramsObj) {
    for (let key in paramsObj) {
      if (paramsObj[key] === undefined) {
        throw new Error(`参数不全，缺少参数${key}`)
      }
    }
  }
}
