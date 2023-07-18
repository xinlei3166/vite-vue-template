import { nextTick } from 'vue'

// 滚动到页面底部
export const scroll = (el = '.layout-content-wrap', scrollHeight?: number) => {
  nextTick(() => {
    const element = document.querySelector(el) as HTMLElement
    element.scrollTop = typeof scrollHeight === 'number' ? scrollHeight : element.scrollHeight
  })
}

export function onbeforeunload(e: any) {
  const confirmationMessage = '系统可能不会保存您所做的更改。'

  ;(e || window.event).returnValue = confirmationMessage

  return confirmationMessage
}
