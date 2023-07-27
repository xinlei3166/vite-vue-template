import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

import { getColorCssVars } from '@packages/token'
import { theme } from 'ant-design-vue'
const { defaultAlgorithm, defaultSeed } = theme
const mapToken = defaultAlgorithm(defaultSeed)

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
      // 使用 antd token 生成的 css 变量，从这里导出。查看所有变量，查看文档 unocss.md。
      ...getColorCssVars(mapToken),
      // 下面这些颜色变量在 getColorVars(mapToken) 方法中都有，简单列举一些。结尾带数字的是自定义变量。
      primary: 'var(--ant-color-primary)', // class="text-primary"
      primaryHover: 'var(--ant-color-primary-hover)',
      primaryActive: 'var(--ant-color-primary-active)',
      primaryTextHover: 'var(--ant-color-primary-text-hover)',
      primaryText: 'var(--ant-color-primary-text)',
      primaryTextActive: 'var(--ant-color-primary-text-active)',
      primaryBg: 'var(--ant-color-primary-bg)',
      primaryBgHover: 'var(--ant-color-primary-bg-hover)',
      primaryBorder: 'var(--ant-color-primary-border)',
      primaryBorderHover: 'var(--ant-color-primary-border-hover)',
      text: 'var(--ant-color-text)',
      text2: 'var(--ant-color-text-secondary)',
      text3: 'var(--ant-color-text-tertiary)',
      text4: 'var(--ant-color-text-quaternary)',
      disabled: 'var(--ant-color-text-secondary)',
      border: 'var(--ant-color-border)',
      border2: 'var(--ant-color-border-secondary)',
      fill: 'var(--ant-color-fill)',
      fill2: 'var(--ant-color-fill-secondary)',
      fill3: 'var(--ant-color-fill-tertiary)',
      fill4: 'var(--ant-color-fill-quaternary)'
    }
  }
})
