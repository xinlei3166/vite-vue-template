<template>
  <div class="title">A组件</div>
  <div class="title">当前结果：{{ number }}</div>
  <a-button type="primary" size="small" style="margin-left: 64px" @click="onAdd">增加</a-button>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const instance = getCurrentInstance()
    const $bus = instance.appContext.config.globalProperties.$bus
    const number = ref(0)

    function onAdd() {
      number.value++
      $bus.emit('change-number', number.value)
    }

    return { number, onAdd }
  }
})
</script>

<style lang="less" scoped></style>
