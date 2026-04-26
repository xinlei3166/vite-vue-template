import { Color } from 'tvision-color'
import { insertThemeStylesheet } from './utils'

export function changeThemeColor(theme: string, mode: 'light' | 'dark') {
  const { colors: newPalette, primary: brandColorIndex } = Color.getColorGradations({
    colors: [theme],
    step: 10,
    remainInput: false // 是否保留输入 不保留会矫正不合适的主题色
  })[0]
  const newColorMap = generateColorMap(theme!, newPalette, mode, brandColorIndex)
  insertThemeStylesheet(theme!, newColorMap, mode)

  document.documentElement.setAttribute('theme-color', theme || '')
}

export function generateColorMap(
  theme: string,
  colorPalette: Array<string>,
  mode: 'light' | 'dark',
  brandColorIdx: number
) {
  const isDarkMode = mode === 'dark'

  if (isDarkMode) {
    // eslint-disable-next-line no-use-before-define
    colorPalette.reverse().map(color => {
      const [h, s, l] = Color.colorTransform(color, 'hex', 'hsl')
      return Color.colorTransform([h, Number(s) - 4, l], 'hsl', 'hex')
    })
    // eslint-disable-next-line no-param-reassign
    brandColorIdx = 10 - brandColorIdx
    colorPalette[0] = `${colorPalette[brandColorIdx]}20`
  }

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
  return colorMap
}
