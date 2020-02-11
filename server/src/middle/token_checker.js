const Token = require("../model/token_model")

module.exports = function() {
  return async function(ctx, next) {
    if (ctx.state.user) {
      const { tokenId } = ctx.state.user
      if ((await Token.verify(tokenId)) === false) {
        const e = new Error("401-Token 已过期")
        throw e
      } else {
        await next()
      }
    } else {
      await next()
    }
  }
}
