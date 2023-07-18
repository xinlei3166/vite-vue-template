import type { App } from 'vue'
import ECharts from 'vue-echarts'

export default {
  install: (app: App) => {
    app.component('VChart', ECharts)
  }
}
