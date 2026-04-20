import type { RouteRecordRaw } from 'vue-router'

// const Layout = () => import('@/components/layout/index.vue')
const Layout = () => import('@/components/layout/Router.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/components',
    name: 'components',
    meta: {
      title: '常用组件',
      icon: 'icon-reloadtime'
    },
    redirect: { name: 'provide-inject' },
    component: Layout,
    children: [
      {
        path: 'router',
        name: 'router',
        meta: {
          title: 'router'
        },
        component: () => import('features/components/router/index.vue')
      },
      {
        path: 'store',
        name: 'store',
        meta: {
          title: 'store'
        },
        component: () => import('features/components/store/index.vue')
      },
      {
        path: 'provide-inject',
        name: 'provide-inject',
        meta: {
          title: 'provide'
        },
        component: () => import('features/components/provide/index.vue')
      },
      {
        path: 'bus',
        name: 'bus',
        meta: {
          title: 'bus'
        },
        component: () => import('features/components/bus/index.vue')
      },
      {
        path: 'search',
        name: 'search',
        meta: {
          title: 'search'
        },
        component: () => import('@packages/components/search/demo/index.vue')
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          title: 'table'
        },
        component: () => import('@packages/components/table/demo/index.vue')
      },
      {
        path: 'sortable',
        name: 'sortable',
        meta: {
          title: 'sortable'
        },
        component: () => import('features/components/sortable/index.vue')
      }
    ]
  }
]

export default routes
