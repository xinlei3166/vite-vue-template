import { getToken, loadingEnd, loadingStart, pageAuth } from '@packages/utils'
import { useMenuStore } from '@/store/menu'
import { checkExternalWhiteRoute, whiteList } from '@/router'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // 在服务器端跳过中间件
  if (process.server) return
  // 完全在客户端跳过中间件
  // if (process.client) return
  // 或仅在初始客户端加载时跳过中间件
  // const nuxtApp = useNuxtApp()
  // if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
  if (checkExternalWhiteRoute(to.path)) return
  const token = getToken()
  if (whiteList.includes(to.path)) {
    if (token && to.path === '/login') return navigateTo({ path: '/' })
    return
  }
  if (!token && to.path !== '/login') return navigateTo({ path: '/login' })
  if (!__DYNAMIC_MENU__) return
  const menuStore = useMenuStore()
  if (menuStore.hasSetRoutes) {
    // const auth = await pageAuth(to.name)
    // if (!auth && to.meta.auth !== false && to.path !== '/403') {
    //   navigateTo('/403')
    // }
    return
  } else {
    await menuStore.setMenus()
    navigateTo(to, { replace: true })
  }
})
