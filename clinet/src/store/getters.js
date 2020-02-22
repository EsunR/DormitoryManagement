const getters = {
  // app
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  // user
  allUserInfo: state => state.user.allUserInfo,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  room: state => state.user.room,
  floor: state => state.user.floor,
  building: state => state.user.building,
  newUser: state => state.user.newUser,
  manageBuildings: state => state.user.manageBuildings,

  // other
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
