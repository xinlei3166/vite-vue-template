import { computed, ref } from 'vue'

export const useDialogHeader = () => {
  const dialogHeaderRef = ref()

  const mode = computed(() => {
    return dialogFullscreen.value ? 'full-screen' : 'modal'
  })
  const resetMode = () => {
    setTimeout(() => {
      dialogFullscreen.value = false
      dialogHeaderRef.value?.resetState()
    }, 200)
  }
  const dialogFullscreen = ref(false)
  const handleDialogFullscreen = (val: boolean) => {
    dialogFullscreen.value = val
  }

  return {
    dialogHeaderRef,
    mode,
    resetMode,
    dialogFullscreen,
    handleDialogFullscreen
  }
}
