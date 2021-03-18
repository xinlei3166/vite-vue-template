<template>
  <a-card class="card">
    <div class="title">Provide-Inject</div>
    <div class="title">可以通过点击父组件中的增加按钮，观察B组件的结果显示</div>
    <div class="title">父组件</div>
    <div class="title">当前结果：{{ number }}</div>
    <a-button type="primary" size="small" style="margin-left: 64px" @click="onAdd">增加</a-button>
    <div class="title">---------------------------------------------------</div>
    <Child />
  </a-card>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import Child from './Child.vue'

export default defineComponent({
  components: { Child },
  setup() {
    const number = ref(0)

    provide('number', number)

    function onAdd() {
      number.value++
    }

    return { number, onAdd }
  }
})
</script>

<style lang="scss" scoped></style>
