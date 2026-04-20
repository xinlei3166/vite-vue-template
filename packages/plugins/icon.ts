import type { App } from 'vue'
import { Icon as IconFont } from 'tdesign-icons-vue-next'
import { defineComponent, h } from 'vue'

const Icon = defineComponent({
  name: 'Icon',
  inheritAttrs: false,
  components: { IconFont },
  props: {
    url: {
      type: String,
      // 如果在iconfont.cn里新增了icon，记得更新下面的链接
      default: `${import.meta.env.VITE_APP_BASE || '/'}iconfont.js`
    }
  },
  setup(props, { attrs }) {
    return () =>
      h(IconFont, {
        ...attrs,
        class: ['iconfont-icon', attrs.class],
        url: props.url,
        loadDefaultIcons: false
      })
  }
})

export default {
  install: (app: App) => {
    app.component('Icon', Icon)
  }
}
