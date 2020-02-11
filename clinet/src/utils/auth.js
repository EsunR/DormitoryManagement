import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

/**
 * 获取 Cookie 中存放的 Token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 向 Cookie 中写入 Token
 * @param {string} token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 移除 Cookie（在登出时使用）
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
