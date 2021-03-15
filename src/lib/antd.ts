import { App } from 'vue'
import {
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Layout
} from 'ant-design-vue'

export const components = [
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Layout
]

export function useAntd(app: App) {
  components.forEach(component => {
    app.use(component)
  })
}

export const pagination = {
  size: 'small',
  current: 1,
  defaultCurrent: 1,
  pageSize: 20,
  showTotal: (total: number | string) => `共${total}条`,
  showLessItems: true,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '40', '50']
}
