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
      icon: 'iconshezhi'
    },
    component: Layout,
    children: [
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
      },
      {
        path: 'provide-inject',
        name: 'provide-inject',
        meta: {
          title: 'provide'
        },
        component: () => import('../views/components/provide/index.vue')
      },
      {
        path: 'bus',
        name: 'bus',
        meta: {
          title: 'bus'
        },
        component: () => import('../views/components/bus/index.vue')
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          title: 'table'
        },
        component: () => import('../views/components/table/index.vue')
      },
      {
        path: 'draggable',
        name: 'draggable',
        meta: {
          title: 'draggable'
        },
        component: () => import('../views/components/draggable/index.vue')
      }
    ]
  }
  // {
  //   path: '/others',
  //   name: 'others',
  //   meta: {
  //     title: '其他组件',
  //     icon: 'iconshezhi'
  //   },
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'vue',
  //       name: 'vue',
  //       meta: {
  //         title: 'vue'
  //       },
  //       component: () => import('../components/HelloWorld.vue')
  //     }
  //   ]
  // }
]

export default routes
