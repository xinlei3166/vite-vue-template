<template>
  <div class="title">子组件</div>
  <div class="title">当前结果：{{ number }}</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup() {
    const number = inject('number')

    return { number }
  }
})
</script>

<style lang="less" scoped></style>
