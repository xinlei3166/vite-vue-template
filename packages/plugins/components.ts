import type { App } from 'vue'
import DialogHeader from '@packages/components/dialog-header/index.vue'
import EllipsisTooltip from '@packages/components/ellipsis-tooltip/index.vue'
import Phone from '@packages/components/phone/index.vue'
import Search from '@packages/components/search/index.vue'
import SearchTable from '@packages/components/table'

export default {
  install: (app: App) => {
    app.component('DialogHeader', DialogHeader)
    app.component('EllipsisTooltip', EllipsisTooltip)
    app.component('Phone', Phone)
    app.component('Search', Search)
    app.component('SearchTable', SearchTable)
  }
}
