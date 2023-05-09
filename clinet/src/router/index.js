import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 同步路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '概览', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 个人信息
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

// 异步路由
export const asyncRoutes = [
  // 学生专属页面 =========================
  {
    path: '/getupRecord',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/getup-record/index'),
        name: 'getupRecord',
        meta: {
          title: '起床记录',
          icon: 'eye-open'
        }
      }
    ]
  },
  {
    path: '/backRecord',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/back-record/index'),
        name: 'backRecord',
        meta: {
          title: '归宿记录',
          icon: 'eye'
        }
      }
    ]
  },
  {
    path: '/cleanRecord',
    component: Layout,
    meta: {
      roles: ['student']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/clean-record/index'),
        name: 'cleanRecord',
        meta: {
          title: '打扫记录',
          icon: 'theme'
        }
      }
    ]
  },
  //  管理员路由 =========================
  {
    path: '/adminManage',
    component: Layout,
    meta: {
      roles: ['superAdmin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin-manage/index'),
        name: 'adminManage',
        meta: {
          title: '管理员管理',
          icon: 'edit'
        }
      }
    ]
  },
  {
    path: '/buildingManage',
    component: Layout,
    meta: {
      roles: ['superAdmin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/building-manage/index'),
        name: 'cleanRecord',
        meta: {
          title: '宿舍楼管理',
          icon: 'international'
        }
      }
    ]
  },
  {
    path: '/floorManage',
    component: Layout,
    meta: {
      roles: ['superAdmin', 'admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/floor-manage/index'),
        name: 'floorManage',
        meta: {
          title: '楼层管理',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/roomInfo',
    component: Layout,
    meta: {
      roles: ['superAdmin', 'admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/room-info/index'),
        name: 'roomInfo',
        meta: {
          title: '宿舍信息',
          icon: 'peoples'
        }
      }
    ]
  },
  {
    path: '/userInfo',
    component: Layout,
    meta: {
      roles: ['superAdmin', 'admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user-info/index'),
        name: 'userInfo',
        meta: {
          title: '学生信息',
          icon: 'people'
        }
      }
    ]
  },
  {
    path: '/recordManage',
    component: Layout,
    meta: {
      roles: ['superAdmin', 'admin'],
      title: '记录查看',
      icon: 'tree'
    },
    children: [
      {
        path: '/recordManage/getup',
        component: () => import('@/views/record-manage/getup-record-manage'),
        name: 'getupRecordManage',
        meta: {
          title: '起床记录'
        }
      },
      {
        path: '/recordManage/back',
        component: () => import('@/views/record-manage/back-record-manage'),
        name: 'backRecordManage',
        meta: {
          title: '归宿记录'
        }
      },
      {
        path: '/recordManage/clean',
        component: () => import('@/views/record-manage/clean-record-manage'),
        name: 'cleanRecordManage',
        meta: {
          title: '清扫记录',
          noCache: true
        }
      }
    ],
  },
  {
    path: '/visitorManage',
    component: Layout,
    meta: {
      roles: ['superAdmin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/visitor-manage/index'),
        name: 'visitorManage',
        meta: {
          title: '来访人员登记',
          icon: 'user'
        }
      }
    ]
  },
  // 404 页面要在最后引入
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
