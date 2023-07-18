// @ts-nocheck
import type { App } from 'vue'
import { auth, pageAuth } from '@packages/utils'

export { auth, pageAuth }

export default {
  install: (app: App) => {
    app.provide('auth', auth)
    app.config.globalProperties.auth = auth
  }
}
