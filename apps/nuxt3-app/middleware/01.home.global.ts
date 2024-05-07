import { useMenuStore } from '@/store/menu'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // 在服务器端跳过中间件
  if (process.server) return
  // 完全在客户端跳过中间件
  // if (process.client) return
  // 或仅在初始客户端加载时跳过中间件
  // const nuxtApp = useNuxtApp()
  // if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
  if (to.path !== '/') return
  if (!__DYNAMIC_MENU__) return navigateTo('/components')
  const menuStore = useMenuStore()
  const routeMenus = menuStore.routeMenus.slice(0, -1)
  if (!routeMenus.length) {
    return navigateTo({
      path: '/403'
    })
  }
  const path = routeMenus[0].children?.length ? routeMenus[0].children[0].path : routeMenus[0].path
  return navigateTo({ path })
})
