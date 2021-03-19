import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import plugins from './plugins'
import directives from './directives'
import './styles/index.less'
import './mock'

const app = createApp(App)

app.use(router)
app.use(store, key)
app.use(plugins)
app.use(directives)

app.mount('#app')
