<template>
  <div class="title">B组件</div>
  <div class="title">当前结果：{{ number }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance()
    const number = ref(0)

    const changeNumber = value => {
      number.value = value
    }

    onMounted(() => {
      ctx.$bus.on('change-number', changeNumber)
    })

    onUnmounted(() => {
      ctx.$bus.off('change-number', changeNumber)
    })

    return { number }
  }
})
</script>

<style lang="less" scoped></style>
