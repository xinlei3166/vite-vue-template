import { App } from 'vue'
import {
  ConfigProvider,
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table
} from 'ant-design-vue'

export const components = [
  ConfigProvider,
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table
]

export default {
  install: (app: App) => {
    components.forEach(component => {
      app.use(component)
    })
  }
}
