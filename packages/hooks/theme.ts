import { ref } from 'vue'
import type { Ref } from 'vue'
import type { GlobalToken } from 'ant-design-vue/es/theme'

export interface Theme {
  theme: 'dark' | 'light'
  layout: 'side' | 'mix'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string
  height: string
  collapsed: boolean
  collapsedWidth: string
  headerTheme: boolean
  showBreadcrumb: boolean
  token: Partial<GlobalToken>
  algorithm: string
}

const theme = ref<Theme>({
  theme: 'light', // light, dark
  layout: 'mix', // side, mix
  mode: 'inline',
  width: '240px',
  height: '64px',
  collapsed: false,
  collapsedWidth: '80px',
  headerTheme: false,
  showBreadcrumb: true, // 是否显示面包屑
  token: {
    colorPrimary: '#0077fa',
    colorInfo: '#0077fa'
  },
  algorithm: 'defaultAlgorithm'
})

export const useTheme = function (): Ref<Theme> {
  return theme
}
