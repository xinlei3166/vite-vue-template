import { App } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const Icon = createFromIconfontCN({
  // 如果在iconfont.cn里新增了icon，记得更新下面的链接
  scriptUrl: '//at.alicdn.com/t/font_2430965_ociofj6htcg.js\n'
})

export default {
  install: (app: App) => {
    app.component('Icon', Icon)
  }
}
