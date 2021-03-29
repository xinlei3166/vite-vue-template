import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('../components/layout/index.vue')

const routes: RouteRecordRaw[] = [
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
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      title: '常用组件',
      icon: 'iconreloadtime'
    },
    redirect: { name: 'provide-inject' },
    component: Layout,
    children: [
      {
        path: 'router',
        name: 'router',
        meta: {
          title: 'router',
          icon: 'iconreloadtime'
        },
        component: () => import('../views/components/router/index.vue')
      },
      {
        path: 'store',
        name: 'store',
        meta: {
          title: 'store',
          icon: 'iconunorderedlist'
        },
        component: () => import('../views/components/store/index.vue')
      },
      {
        path: 'provide-inject',
        name: 'provide-inject',
        meta: {
          title: 'provide',
          icon: 'iconappstoreadd'
        },
        component: () => import('../views/components/provide/index.vue')
      },
      {
        path: 'bus',
        name: 'bus',
        meta: {
          title: 'bus',
          icon: 'iconuser'
        },
        component: () => import('../views/components/bus/index.vue')
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          title: 'table',
          icon: 'iconappstore'
        },
        component: () => import('../views/components/table/index.vue')
      },
      {
        path: 'fixed-table',
        name: 'fixed-table',
        meta: {
          title: 'fixed-table',
          icon: 'iconappstore'
        },
        component: () => import('../views/components/table/fixed.vue')
      },
      {
        path: 'draggable',
        name: 'draggable',
        meta: {
          title: 'draggable',
          icon: 'iconsetting'
        },
        component: () => import('../views/components/draggable/index.vue')
      }
    ]
  },
  {
    path: '/others',
    name: 'others',
    meta: {
      title: '其他组件',
      icon: 'iconappstore'
    },
    component: Layout,
    redirect: { name: 'vue' },
    children: [
      {
        path: 'vue',
        name: 'vue',
        meta: {
          title: 'vue',
          icon: 'iconsetting'
        },
        component: () => import('../components/HelloWorld.vue')
      }
    ]
  }
]

export default routes
