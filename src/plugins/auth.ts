import { App } from 'vue'

const auth = (permission: string) => {
  // return !!store.auth.permission
  return true
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$auth = auth
  }
}
