import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/components/layout/index.vue')
const LayoutRouter = () => import('@/components/layout/Router.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/others',
    name: 'others',
    meta: {
      title: '其他组件',
      // link: true,
      icon: 'icon-appstore'
    },
    component: Layout,
    redirect: { name: 'framework' },
    children: [
      {
        path: 'framework',
        name: '前端框架',
        meta: {
          title: 'framework',
          icon: 'icon-setting'
        },
        component: LayoutRouter,
        children: [
          {
            path: 'vue',
            name: 'vue',
            meta: {
              title: 'vue'
            },
            component: () => import('@/components/HelloWorld.vue')
          }
        ]
      }
    ]
  }
]

export default routes
