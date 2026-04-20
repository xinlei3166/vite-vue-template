import type { App } from 'vue'
import auth from './auth'
import components from './components'
import echarts from './echarts'
import icon from './icon'

export default {
  install: (app: App) => {
    app.use(icon)
    app.use(auth)
    app.use(components)
    app.use(echarts)
  }
}
