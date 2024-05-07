export default defineNuxtPlugin(nuxtApp => {
  if (import.meta.env.PROD) {
    nuxtApp.vueApp.config.errorHandler = (err, vm, info) => {
      console.group('vue_global_error')
      console.log('捕获到异常：', { err, vm, info })
      console.groupEnd()
    }

    window.onerror = function (message, source, lineno, colno, error) {
      console.group('window_global_error')
      console.log('捕获到异常：', { message, source, lineno, colno, error })
      console.groupEnd()
    }
  }
})
