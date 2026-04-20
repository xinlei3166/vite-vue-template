<template>
  <div>
    <div class="title">B组件</div>
    <div class="title">当前结果：{{ number }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useEvent } from '@packages/hooks'

export default defineComponent({
  setup() {
    const event = useEvent()
    const number = ref(0)

    const changeNumber = (value: any) => {
      number.value = value
    }

    onMounted(() => {
      event.on('change-number', changeNumber)
    })

    onBeforeUnmount(() => {
      event.off('change-number', changeNumber)
    })

    return { number }
  }
})
</script>

<style lang="less" scoped></style>
