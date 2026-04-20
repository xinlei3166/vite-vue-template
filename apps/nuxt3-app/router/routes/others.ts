import type { RouteRecordRaw } from 'vue-router'

// const Layout = () => import('@layout/index.vue')
const Layout = () => import('@layout/Router.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/others',
    name: 'others',
    meta: {
      title: '其他组件',
      link: true,
      icon: 'icon-appstore'
    },
    component: Layout,
    redirect: { name: 'vue' },
    children: [
      {
        path: '',
        name: 'vue',
        meta: {
          title: 'vue',
          icon: 'icon-setting'
        },
        component: () => import('@/components/HelloWorld.vue')
      }
    ]
  }
]

export default routes
