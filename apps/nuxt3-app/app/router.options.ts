import { routes as manualRoutes } from '../router'

import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  routes: _routes => manualRoutes
}
