import { defineStore } from 'pinia'
import { getUserMenu } from '@/api'
import { errorRoute } from '@/router/common'
const components = import.meta.glob('@/views/**/*.vue')
const features = import.meta.glob('features/**/*.vue')

export interface LeftMenu {
  path: string
  name: string
  meta: {
    title: string
    icon?: string
    link?: boolean
    hidden?: boolean
    auth?: boolean
    menu?: string
  }
  redirect?: any
  component?: any
  children?: Array<LeftMenu>
}

export interface MenuState {
  menus: Record<string, any>[]
  leftMenus: Array<LeftMenu>
  routeMenus: Array<LeftMenu>
  hasSetRoutes: boolean
}

const sorter = (a: Record<string, any>, b: Record<string, any>) =>
  (a.priority || 0) - (b.priority || 0)

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    menus: [],
    leftMenus: [],
    routeMenus: [],
    hasSetRoutes: false
  }),
  getters: {
    LeftMenus(state) {
      return state.leftMenus
    }
  },
  actions: {
    async setMenus() {
      const res: any = await getUserMenu()
      if (!res || res.code !== 0) {
        this.hasSetRoutes = true
        return
      }
      const menus: Record<string, any>[] = (res.data || []).filter(
        (m: Record<string, any>) => m.menuType === 1
      )
      menus.sort(sorter)
      this.menus = menus
      let routesMenus: Record<string, any> = []
      routesMenus = routesMenus.concat(generateRouteMenus(menus))
      routesMenus.push(errorRoute)
      this.setRouteMenus(routesMenus as MenuState['leftMenus'])
      this.setLeftMenus(
        routesMenus.filter(
          (r: Record<string, any>) => r.path !== '/:pathMatch(.*)*'
        ) as MenuState['leftMenus']
      )
      this.addRoutes()
      this.hasSetRoutes = true
    },
    setLeftMenus(menus: MenuState['leftMenus']) {
      this.leftMenus = menus
    },
    setRouteMenus(menus: MenuState['leftMenus']) {
      this.routeMenus = menus
    },
    cleanup() {
      this.menus = []
      this.leftMenus = []
      this.routeMenus = []
    },
    addRoutes() {
      const router = useRouter()
      for (const route of this.routeMenus) {
        if (router.hasRoute(route.name)) {
          router.removeRoute(route.name)
        }
      }
      for (const route of this.routeMenus) {
        router.addRoute(route as any)
      }
    }
  }
})

// generateRouteMenus
const layouts = {
  layout: () => import('../components/layout/index.vue'),
  routerView: () => import('../components/layout/Router.vue')
}

function _import(path: string) {
  return components['/src/views' + path] || features['../../features' + path]
}

const generateRouteMenus = (menus: Record<string, any>[], parentMenu?: string, level = 1) => {
  menus.sort(sorter)
  return menus.map(menu => {
    const {
      menuName: title,
      icon,
      expand,
      hidden,
      menuCode: name,
      component: _component,
      menuUri: path,
      redirect,
      childMenuList: _childMenuList = []
    } = menu
    const link = !expand
    // 第一级路由使用main layout,其他使用route-view
    const layout = level === 1 ? layouts['layout'] : layouts['routerView']
    const component = _component === 'layout' ? layout : _import(_component)
    const parentMenuName = level === 1 ? parentMenu : undefined
    const routeModel = {
      name,
      path,
      meta: { title, icon, hidden, link, menu: parentMenuName },
      redirect,
      component
    }

    let hiddenChildren: any[] = []
    const route: Record<string, any> = { ...routeModel, meta: { ...routeModel.meta }, children: [] }
    const childMenuList = _childMenuList.filter((m: Record<string, any>) => m.menuType === 1)
    const childrenLength = childMenuList && childMenuList.length ? childMenuList.length : 0
    const needHandleConditions: any[] = [
      level === 1 && link && !hidden,
      level > 1 && link && !hidden && _childMenuList?.length
    ]

    if (needHandleConditions.some(x => x)) {
      hiddenChildren = [
        {
          ...routeModel,
          meta: { ...routeModel.meta, hidden: true, link: false },
          redirect: undefined
        }
      ]
      route.name = name + '__hidden'
      route.component = layout
      route.children = [...hiddenChildren]
    }

    // 判断是否存在子路由
    if (childrenLength) {
      route.children = [
        ...route.children,
        ...generateRouteMenus(menu.childMenuList, parentMenu, level + 1)
      ]
      if (level === 1 && _component === 'layout') {
        route.meta.firstChildrenRoutePath = route.children[0].path
      }
    }

    return route
  })
}
