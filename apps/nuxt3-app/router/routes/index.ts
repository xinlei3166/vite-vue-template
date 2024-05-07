import type { RouteRecordRaw } from 'vue-router'

import components from './components'
import others from './others'

const routes: RouteRecordRaw[] = [...components, ...others]

export default routes
