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
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/vue',
    name: 'vue',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/router',
    name: 'router',
    component: () => import('../views/router/index.vue')
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('../views/store/index.vue')
  }
]

export default routes
