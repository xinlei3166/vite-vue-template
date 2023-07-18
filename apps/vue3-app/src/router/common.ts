import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/components/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/403',
    meta: {
      title: '403',
      auth: false,
      hidden: true
    },
    component: () => import('@/components/exception/403.vue')
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '404',
      auth: false,
      hidden: true
    },
    component: () => import('@/components/exception/404.vue')
  },
  {
    name: '500',
    path: '/500',
    meta: {
      title: '500',
      auth: false,
      hidden: true
    },
    component: () => import('@/components/exception/500.vue')
  }
]

export const errorRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: { name: '404' }
}

export default routes
