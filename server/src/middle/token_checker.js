const Token = require("../model/token_model")
const { sysConfig } = require("../config")

module.exports = function() {
  return async function(ctx, next) {
    if (ctx.state.user) {
      const { tokenId } = ctx.state.user
      if (sysConfig.devMode) {
        await next()
      } else {
        if ((await Token.hasToken(tokenId)) === false) {
          const e = new Error()
          e.message = "401-Token 已失效"
          throw e
        } else {
          await next()
        }
      }
    } else {
      await next()
    }
  }
}
