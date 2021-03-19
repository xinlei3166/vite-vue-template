import { reactive } from 'vue'

export interface Theme {
  theme: 'dark' | 'light'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string
  collapsed: boolean
  collapsedWidth: string
  showSubMenuName: boolean
}

const theme = reactive<Theme>({
  theme: 'dark',
  mode: 'inline',
  width: '208px',
  collapsed: false,
  collapsedWidth: '80px',
  showSubMenuName: true // 控制左侧菜单折叠时，是否显示文字
})

export const useTheme = function () {
  return theme
}
