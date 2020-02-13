// 路由跳转前进行校验
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 判断是否存在 Token
  const hasToken = getToken()

  if (hasToken) {
    // 如果存在 Token
    if (to.path === '/login') {
      // 如果已登录，就跳转到系统主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断是否已经获取了用户角色，如果获取了就使用，否则向服务器请求用户数据
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 向 store 中存放用户信息，并获取用户角色
          const { roles } = await store.dispatch('user/getInfo')
          // 由用户角色生成路由表，并存放再 store 中
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )

          // 动态添加路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // 如果出错，移除 token 并让用户重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '用户身份信息获取失败，请重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 本地没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是无需登录的页面就进行直接跳转
      next()
    } else {
      // 跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
