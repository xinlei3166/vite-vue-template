import type { App } from 'vue'
import mitt from 'mitt'

export default {
  install: (app: App) => {
    const bus = mitt()
    app.provide('bus', bus)
    app.config.globalProperties.bus = mitt()
  }
}
