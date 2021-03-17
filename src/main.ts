import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import antd from './plugins/antd'
import auth from './plugins/auth'
import bus from './plugins/bus'
import './styles/index.scss'
import './mock'

const app = createApp(App)

app.use(router)
app.use(store, key)
app.use(antd)
app.use(auth)
app.use(bus)

app.mount('#app')
