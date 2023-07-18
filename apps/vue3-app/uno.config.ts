import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

import { theme } from 'ant-design-vue'
const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme
import { token } from './config/theme'

export const mapToken = defaultAlgorithm({
  ...defaultSeed,
  ...token
})
export const darkMapToken = darkAlgorithm({
  ...defaultSeed,
  ...token
})

// Secondary Tertiary Quaternary
const excludedKeys = ['colorWhite', 'colorDark']
// 获取 antd 颜色变量(color开头的变量), colorPrimary -> primary
const getColorVars = (token: Record<string, any>) => {
  const keys = Object.keys(token).filter(t => t.startsWith('color') && !excludedKeys.includes(t))
  return keys.reduce((prev: Record<string, any>, value: string) => {
    let shortKey = value.replace('color', '')
    shortKey = shortKey.replace(shortKey[0], shortKey[0].toLowerCase())
    prev[shortKey] = token[value]
    return prev
  }, {})
}

// https://unocss.dev/interactive/
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: false
      // ignoreAttributes: []
    }),
    presetRemToPx()
  ],
  // rules: [[/^opacity-brand-(\w+)$/, ([, d]) => ({ opacity: `var(--${d}-opacity)` })]],
  theme: {
    colors: {
      // 使用 antd 的颜色变量，从这里导出。查看所有变量，查看文档 unocss.md。
      ...getColorVars(mapToken),
      // 下面这些颜色变量在 getColorVars(mapToken) 方法中都有，简单列举一些。结尾带数字的是自定义变量。
      primary: mapToken.colorPrimary, // class="text-primary", color: theme('colors.primary')
      primaryHover: mapToken.colorPrimaryHover,
      primaryActive: mapToken.colorPrimaryActive,
      primaryBg: mapToken.colorPrimaryBg,
      primaryBgHover: mapToken.colorPrimaryBgHover,
      primaryBorder: mapToken.colorPrimaryBorder,
      primaryBorderHover: mapToken.colorPrimaryBorderHover,
      text: mapToken.colorText,
      text2: mapToken.colorTextSecondary,
      text3: mapToken.colorTextTertiary,
      text4: mapToken.colorTextQuaternary,
      disabled: mapToken.colorTextSecondary,
      border: mapToken.colorBorder,
      border2: mapToken.colorBorderSecondary,
      fill: mapToken.colorFill,
      fill2: mapToken.colorFillSecondary,
      fill3: mapToken.colorFillTertiary,
      fill4: mapToken.colorFillQuaternary,
      // dark 模式下 antd 的颜色变量
      dark: { ...getColorVars(darkMapToken) } // class="text-dark-primary", color: theme('colors.dark.primary')
    }
    // 如果需要使用 antd 全部变量，去掉注释
    // antd: mapToken, // color: theme('antd.colorPrimary')
    // antdDark: darkMapToken
  }
})
