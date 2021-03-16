import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('../components/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      title: 'components'
    },
    component: Layout,
    children: [
      {
        path: 'vue',
        name: 'vue',
        meta: {
          title: 'vue'
        },
        component: () => import('../components/HelloWorld.vue')
      },
      {
        path: 'router',
        name: 'router',
        meta: {
          title: 'router'
        },
        component: () => import('../views/components/router/index.vue')
      },
      {
        path: 'store',
        name: 'store',
        meta: {
          title: 'store'
        },
        component: () => import('../views/components/store/index.vue')
      }
    ]
  }
]

export default routes
