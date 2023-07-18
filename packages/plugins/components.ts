import type { App } from 'vue'
import Search from '@packages/components/search/index.vue'
import Phone from '@packages/components/phone/index.vue'

export default {
  install: (app: App) => {
    app.component('Search', Search)
    app.component('Phone', Phone)
  }
}
