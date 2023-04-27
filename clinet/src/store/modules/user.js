import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getManageBuildings } from '@/api/building'

const state = {
  allUserInfo: {},
  token: getToken(), // 由 cookie 获取 token
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  room: undefined,
  floor: undefined,
  building: undefined,
  newUser: false,
  manageBuildings: []
}

const mutations = {
  SET_ALLUSERINFO: (state, info) => {
    state.allUserInfo = info
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROOM: (state, room) => {
    state.room = room
  },
  SET_FLOOR: (state, floor) => {
    state.floor = floor
  },
  SET_BUILDING: (state, building) => {
    state.building = building
  },
  SET_NEWUSER: (state, value) => {
    state.newUser = value
  },
  SET_MANAGEBUILDINGS: (state, value) => {
    state.manageBuildings = value
  }
}

const actions = {
  // user login 在登录时调用，获取用户 Token 并写入 Store 和 Localstroge
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info 在获取用户信息时调用，向 store 中写入信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response
          if (!data) {
            reject('Token 验证失败，轻重新登录。')
          }

          data.roles = [data.role]
          const { roles, name, avatar, room, floor, building } = data

          // 服务器端返回的角色必须是一个数组
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          // 设置用户信息
          commit('SET_ROLES', roles)
          commit('SET_NAME', name || '欢迎您，新用户')
          commit('SET_AVATAR', avatar || require('@/assets/avatar.jpg'))
          commit('SET_ROOM', room)
          commit('SET_FLOOR', floor)
          commit('SET_BUILDING', building)
          if (data.role === 'student' && !room) {
            commit('SET_NEWUSER', true)
          } else {
            commit('SET_NEWUSER', false)
          }
          // 将信息存储到 allinfo 中
          delete data.room
          delete data.floor
          delete data.building
          commit('SET_ALLUSERINFO', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
      getManageBuildings().then(res => {
        const { buildings } = res.data
        commit('SET_MANAGEBUILDINGS', buildings)
      })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // 复位视图，让用户处于未登录状态
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
