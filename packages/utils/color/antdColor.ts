import { generate } from '@ant-design/colors'
import { insertThemeStylesheet } from './utils'

export function changeThemeColor(theme: string, mode: 'light' | 'dark') {
  const newPalette = generate(theme, {
    theme: mode === 'dark' ? 'dark' : undefined
  })
  const brandColorIndex = 5
  const newColorMap = generateColorMap(theme!, newPalette, mode, brandColorIndex)
  insertThemeStylesheet(theme!, newColorMap, mode)

  document.documentElement.setAttribute('theme-color', theme || '')
}
export function generateColorMap(
  theme: string,
  _colorPalette: Array<string>,
  mode: 'light' | 'dark',
  brandColorIdx = 5
) {
  const isDarkMode = mode === 'dark'
  const colorPalette = isDarkMode ? generate(theme, { theme: 'dark' }) : _colorPalette

  const colorMap = {
    '--td-brand-color': colorPalette[brandColorIdx], // 主题色
    '--td-brand-color-1': colorPalette[0], // light
    '--td-brand-color-2': colorPalette[1], // focus
    '--td-brand-color-3': colorPalette[2], // disabled
    '--td-brand-color-4': colorPalette[3],
    '--td-brand-color-5': colorPalette[4],
    '--td-brand-color-6': colorPalette[5],
    '--td-brand-color-7': brandColorIdx > 0 ? colorPalette[brandColorIdx - 1] : theme, // hover
    '--td-brand-color-8': colorPalette[brandColorIdx], // 主题色
    '--td-brand-color-9': brandColorIdx > 8 ? theme : colorPalette[brandColorIdx + 1], // click
    '--td-brand-color-10': colorPalette[9]
  }
  console.log('colorMap', colorMap)

  return colorMap
}
