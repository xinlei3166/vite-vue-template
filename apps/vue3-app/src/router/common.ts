import type { RouteRecordRaw } from 'vue-router'

// const Layout = () => import('@/components/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    name: '403',
    path: '/403',
    meta: { title: '403', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/403')
  },
  {
    name: '404',
    path: '/404',
    meta: { title: '404', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/404')
  },
  {
    name: '500',
    path: '/500',
    meta: { title: '500', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/500')
  },
  {
    name: 'browserIncompatible',
    path: '/browser-incompatible',
    meta: { title: '浏览器不兼容', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/BrowserIncompatible')
  },
  {
    name: 'maintenance',
    path: '/maintenance',
    meta: { title: '系统维护', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/Maintenance')
  },
  {
    name: 'networkError',
    path: '/network-error',
    meta: { title: '网络异常', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/NetworkError')
  },
  {
    name: 'success',
    path: '/success',
    meta: { title: '成功', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/Success')
  },
  {
    name: 'fail',
    path: '/fail',
    meta: { title: '失败', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/Fail')
  },
  {
    name: 'error403',
    path: '/error-403',
    meta: { title: 'Error403', hnameden: true, noUseLayout: true },
    component: () => import('@/components/exception/Error403')
  }
]

export const errorRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: { name: '404' }
}

export default routes
