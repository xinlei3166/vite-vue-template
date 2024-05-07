import plugins from '@packages/plugins'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(plugins)
})
