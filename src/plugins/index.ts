import { App } from 'vue'
import antd from './antd'
import icon from './icon'
import auth from './auth'
import bus from './bus'

export default {
  install: (app: App) => {
    app.use(antd)
    app.use(icon)
    app.use(auth)
    app.use(bus)
  }
}
