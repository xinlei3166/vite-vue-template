import type { App } from 'vue'
import title from './title'

export default {
  install: (app: App) => {
    app.directive('title', title)
  }
}
