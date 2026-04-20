import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

// https://unocss.dev/interactive/
export default defineConfig({
  presets: [
    presetWind3(),
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
      // 文字 & 图标 颜色
      fontWhite1: 'var(--td-font-white-1)',
      fontWhite2: 'var(--td-font-white-2)',
      fontWhite3: 'var(--td-font-white-3)',
      fontWhite4: 'var(--td-font-white-4)',
      fontGray1: 'var(--td-font-gray-1)',
      fontGray2: 'var(--td-font-gray-2)',
      fontGray3: 'var(--td-font-gray-3)',
      fontGray4: 'var(--td-font-gray-4)',

      // 基础颜色
      brand: 'var(--td-brand-color)', // 色彩-品牌-可操作
      brandHover: 'var(--td-brand-color-hover)', // hover态
      brandFocus: 'var( --td-brand-color-focus)', // focus态，包括鼠标和键盘
      brandActive: 'var(--td-brand-color-active)', // 点击态
      brandDisabled: 'var(--td-brand-color-disabled)', // 禁用态
      brandLight: 'var(--td-brand-color-light)', // 浅色的选中态
      brandLightHover: 'var(--td-brand-color-light-hover)',

      // 警告色
      warning: 'var(--td-warning-color)', // 色彩-功能-警告
      warningHover: 'var(--td-warning-color-hover)',
      warningFocus: 'var(--td-warning-color-focus)',
      warningActive: 'var(--td-warning-color-active)',
      warningDisabled: 'var(--td-warning-color-disabled)',
      warningLight: 'var(--td-warning-color-light)',
      warningLightHover: 'var(--td-warning-color-light-hover)',

      // 失败/错误色
      error: 'var(--td-error-color)', // 色彩-功能-失败
      errorHover: 'var(--td-error-color-hover)',
      errorFocus: 'var(--td-error-color-focus)',
      errorActive: 'var(--td-error-color-active)',
      errorDisabled: 'var(--td-error-color-disabled)',
      errorLight: 'var(--td-error-color-light)',
      errorLightHover: 'var(--td-error-color-light-hover)',

      // 成功色扩展
      success: 'var(--td-success-color)', // 色彩-功能-成功
      successHover: 'var(--td-success-color-hover)',
      successFocus: 'var(--td-success-color-focus)',
      successActive: 'var(--td-success-color-active)',
      successDisabled: 'var(--td-success-color-disabled)',
      successLight: 'var(--td-success-color-light)',
      successLightHover: 'var(--td-success-color-light-hover)',

      // 遮罩
      mask: 'var(--td-mask-active)', // 遮罩-弹出
      maskDisabled: 'var(--td-mask-disabled)', // 遮罩-禁用
      maskBackground: 'var(--td-mask-background)', // 二维码遮罩

      // 背景色
      bgPage: 'var(--td-bg-color-page)', // 色彩 - page
      bgContainer: 'var(--td-bg-color-container)', // 色彩 - 容器
      bgContainerHover: 'var(--td-bg-color-container-hover)', // 色彩 - 容器 - hover
      bgContainerActive: 'var(--td-bg-color-container-active)', // 色彩 - 容器 - active
      bgContainerSelect: 'var(--td-bg-color-container-select)', // 色彩 - 容器 - select
      bgSecondaryContainer: 'var(--td-bg-color-secondarycontainer)', // 色彩 - 次级容器
      bgSecondaryContainerHover: 'var(--td-bg-color-secondarycontainer-hover)', // 色彩 - 次级容器 - hover
      bgSecondaryContainerActive: 'var(--td-bg-color-secondarycontainer-active)', // 色彩 - 次级容器 - active
      bgComponent: 'var(--td-bg-color-component)', // 色彩 - 组件
      bgComponentHover: 'var(--td-bg-color-component-hover)', // 色彩 - 组件 - hover
      bgComponentActive: 'var(--td-bg-color-component-active)', // 色彩 - 组件 - active
      bgSecondaryComponent: 'var(--td-bg-color-secondarycomponent)', // 色彩 - 次级组件
      bgSecondaryComponentHover: 'var(--td-bg-color-secondarycomponent-hover)', // 色彩 - 次级组件 - hover
      bgSecondaryComponentActive: 'var(--td-bg-color-secondarycomponent-active)', // 色彩 - 次级组件 - active
      bgComponentDisabled: 'var(--td-bg-color-component-disabled)', // 色彩 - 组件 - disabled

      // 特殊组件背景色，目前只用于 button、input 组件多主题场景，浅色主题下固定为白色，深色主题下为 transparent 适配背景颜色
      bgSpecialComponent: 'var(--td-bg-color-specialcomponent)',

      // 文本颜色
      textPrimary: 'var(--td-text-color-primary)', // 色彩-文字-主要
      textSecondary: 'var(--td-text-color-secondary)', // 色彩-文字-次要
      textPlaceholder: 'var(--td-text-color-placeholder)', // 色彩-文字-占位符/说明
      textDisabled: 'var(--td-text-color-disabled)', // 色彩-文字-禁用
      textAnti: 'var(--td-text-color-anti)', // 色彩-文字-反色
      textBrand: 'var(--td-text-color-brand)', // 色彩-文字-品牌
      textLink: 'var(--td-text-color-link)', // 色彩-文字-链接
      textWatermark: 'var(--td-text-color-watermark)', // 色彩-文字-水印颜色

      // 分割线
      borderLevel1: 'var(--td-border-level-1-color)',
      componentStroke: 'var(--td-component-stroke)',
      // 边框
      borderLevel2: 'var(--td-border-level-2-color)',
      componentBorder: 'var(--td-component-border)',

      // 基础/下层 投影 hover 使用的组件包括：表格
      shadow1: 'var(--td-shadow-1)',
      // 中层投影 下拉 使用的组件包括：下拉菜单 / 气泡确认框 / 选择器
      shadow2: 'var(--td-shadow-2)',
      // 上层投影（警示/弹窗）使用的组件包括：全局提示 / 消息通知
      shadow3: 'var(--td-shadow-3)',

      // 内投影 用于弹窗类组件（气泡确认框 / 全局提示 / 消息通知）的内描边
      shadowInsetTop: 'var(--td-shadow-inset-top)',
      shadowInsetRight: 'var(--td-shadow-inset-right)',
      shadowInsetBottom: 'var(--td-shadow-inset-bottom)',
      shadowInsetLeft: 'var(--td-shadow-inset-left)',

      // table 特定阴影
      tableShadowColor: 'var(--td-table-shadow-color)',

      // 滚动条颜色
      scrollbar: 'var(--td-scrollbar-color)',
      // 滚动条悬浮颜色（hover）
      scrollbarHover: 'var(--td-scrollbar-hover-color)',
      // 滚动条轨道颜色，不能是带透明度，否则纵向滚动时，横向滚动条会穿透
      scrollTrack: 'var(--td-scroll-track-color)'
    }
  }
})
