import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import common from './common'
import routes from './routes'
import { loadingStart, loadingEnd, getToken } from '@packages/utils'
import { useMenuStore } from '@/store/menu'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: __DYNAMIC_MENU__ ? [...home, ...common] : [...home, ...routes, ...common]
})

export const checkExternalWhiteRoute = (routePath: string) => {
  let hasExternalWhiteRoute = false
  for (const w of externalWhiteList) {
    if (routePath.startsWith(w)) {
      hasExternalWhiteRoute = true
      break
    }
  }
  return hasExternalWhiteRoute
}

export const externalWhiteList = ['/visualScreen']

const whiteList = ['/login', '/initLogin']
router.beforeEach(async (to, from, next) => {
  loadingStart()
  if (checkExternalWhiteRoute(to.path)) return next()
  const token = getToken()
  if (whiteList.includes(to.path)) {
    if (token && to.path === '/login') return next({ path: '/' })
    return next()
  }
  if (!token) return next({ path: '/login' })
  if (!__DYNAMIC_MENU__) return next()
  const menuStore = useMenuStore()
  if (menuStore.hasSetRoutes) {
    next()
  } else {
    await menuStore.setMenus()
    next({ ...to, replace: true })
  }
})

router.afterEach(() => {
  loadingEnd()
})

export default router
