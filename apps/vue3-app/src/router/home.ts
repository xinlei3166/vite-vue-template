import { useMenuStore } from '@/store/menu'
import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/components/layout/index.vue')

const beforeEnter = async (to: any, from: any, next: any) => {
  // 非动态路由下跳转的路径，如果不需要跳转路由对象删除beforeEnter方法
  if (!__DYNAMIC_MENU__) return next('/components')
  const menuStore = useMenuStore()
  const routeMenus = menuStore.routeMenus.slice(0, -1)
  if (!routeMenus.length) {
    next({
      path: '/403'
    })
    return
  }
  next({
    path: routeMenus[0].path
  })
}

export default [
  {
    path: '/',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页'
        },
        beforeEnter,
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  }
] as any as RouteRecordRaw[]
