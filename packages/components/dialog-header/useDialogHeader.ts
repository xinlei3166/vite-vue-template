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
