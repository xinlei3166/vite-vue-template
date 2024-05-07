import home from './home'
import common from './common'
import _routes from './routes'

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

export const whiteList = ['/login']

export const routes = __DYNAMIC_MENU__ ? [...home, ...common] : [...home, ..._routes, ...common]

// 兼容 import router from '@/router'
export default window?.$nuxt?.$router
