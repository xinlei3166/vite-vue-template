import { createApp as _createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import plugins from '@packages/plugins'
import '@packages/styles/index.less'
import '@packages/styles/reset.less'
import '@/styles/index.less'
import 'animate.css'
import 'virtual:uno.css'
import './mock'

function createApp() {
  const app = _createApp(App)
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)
  app.use(router)
  app.use(plugins)

  app.mount('#app')

  if (import.meta.env.PROD) {
    app.config.errorHandler = (err, vm, info) => {
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

  return app
}

declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean
    // 子应用mount函数
    __WUJIE_MOUNT: () => void
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void
    // 子应用无界实例
    __WUJIE: { mount: () => void }
  }
}

if (window.__POWERED_BY_WUJIE__) {
  let app: any
  window.__WUJIE_MOUNT = () => {
    app = createApp()
  }
  window.__WUJIE_UNMOUNT = () => {
    app.unmount()
  }
  // module脚本异步加载，应用主动调用生命周期
  window.__WUJIE.mount()
} else {
  createApp()
}
