import type { App } from 'vue'
import icon from './icon'
import auth from './auth'
import bus from './bus'
import components from './components'
import echarts from './echarts'

export default {
  install: (app: App) => {
    app.use(icon)
    app.use(auth)
    app.use(bus)
    app.use(components)
    app.use(echarts)
  }
}
