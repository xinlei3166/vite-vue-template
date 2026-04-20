import { ref } from 'vue'

export interface Theme {
  theme: 'dark' | 'light'
  layout: 'side' | 'mix'
  expandType: 'normal' | 'popup'
  width: string
  height: string
  collapsed: boolean
  collapsedWidth: string
  headerTheme: boolean
  showBreadcrumb: boolean
  themeColor: string
}

const theme = ref<Theme>({
  theme: 'light', // light, dark
  layout: 'mix', // side, mix
  expandType: 'normal',
  width: '240px',
  height: '56px',
  collapsed: false,
  collapsedWidth: '64px',
  headerTheme: false,
  showBreadcrumb: true, // 是否显示面包屑
  themeColor: '#0077fa'
})

export const useTheme = function () {
  return theme
}
