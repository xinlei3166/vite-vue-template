import type { App } from 'vue'
import Phone from '@packages/components/phone/index.vue'
import Search from '@packages/components/search/index.vue'
import SearchTable from '@packages/components/table'

export default {
  install: (app: App) => {
    app.component('Search', Search)
    app.component('Phone', Phone)
    app.component('SearchTable', SearchTable)
  }
}
