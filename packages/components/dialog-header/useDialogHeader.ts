/*
 * @Description: 控制弹窗mode
 * @Author: zhengxinlei
 * @Date: 2025-07-03 20:39:17
 * @LastEditTime: 2025-07-03 20:43:24
 * @LastEditors: zhengxinlei
 * @FilePath: /jjlcm-admin/src/pages/chongming/components/dialog-header/useDialogHeader.ts
 */

import { computed, ref } from 'vue'

export const useDialogHeader = () => {
  const mode = computed(() => {
    return dialogFullscreen.value ? 'full-screen' : 'modal'
  })
  const resetMode = () => {
    dialogFullscreen.value = false
  }
  const dialogFullscreen = ref(false)
  const handleDialogFullscreen = (val: boolean) => {
    dialogFullscreen.value = val
  }

  return {
    mode,
    resetMode,
    dialogFullscreen,
    handleDialogFullscreen
  }
}
