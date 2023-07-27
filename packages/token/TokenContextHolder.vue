<script setup lang="ts">
import { ref, watch, onMounted, unref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import type { GlobalToken } from 'ant-design-vue/es/theme'
import { theme } from 'ant-design-vue'
import { generateColorCssVars } from './utils'

const { token } = theme.useToken()
const root = ref()

onMounted(() => {
  root.value = document.querySelector(':root')
  handleTokenChange(token)
})

const handleTokenChange = (token: MaybeRef<GlobalToken>) => {
  token = unref(token)
  if (!root.value) return
  root.value.style.cssText = generateColorCssVars(token)
}
watch(token, handleTokenChange, {
  immediate: true,
  deep: true
})
</script>

<template>
  <div class="token-context-holder"></div>
</template>

<style scoped lang="less">
.token-context-holder {
  display: none;
}
</style>
