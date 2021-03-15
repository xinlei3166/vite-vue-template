import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import { useAntd, pagination } from './lib/antd'

const app = createApp(App)

useAntd(app)
app.use(router)
app.use(store, key)

app.config.globalProperties.$auth = () => {
  // store.auth.xxx = xxx
}

app.mount('#app')
