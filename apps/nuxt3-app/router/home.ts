import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/components/layout/index.vue')

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
