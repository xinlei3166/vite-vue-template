import { extractStyle } from 'ant-design-vue/lib/_util/static-style-extract'
import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  // meta: {
  //   name: 'nuxt-antd-css'
  // },
  // setup(_, nuxt) {
  //   // spa 时并不需要注入 css
  //   if (!nuxt.options.ssr) {
  //     return
  //   }
  //
  //   // generate 时，通过 replace 修改 process.env.NODE_ENV 为 production (默认为     prerender)
  //   // 而 antd 生成 css 前缀时依赖 process.env.NODE_ENV
  //   if (nuxt.options.dev === false && nuxt.options.nitro.static) {
  //     nuxt.options.nitro.replace ??= {}
  //     nuxt.options.nitro.replace['process.env.NODE_ENV'] = "'production'"
  //   }
  //   nuxt.options.app.head?.style?.push(extractStyle())
  // }
})
