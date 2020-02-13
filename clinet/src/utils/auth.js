const TokenKey = 'token'

/**
 * 获取 Cookie 中存放的 Token
 */
export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

/**
 * 向 Cookie 中写入 Token
 * @param {string} token
 */
export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

/**
 * 移除 Cookie（在登出时使用）
 */
export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
