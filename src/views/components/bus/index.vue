<template>
  <a-card class="card">
    <div class="title">Bus-相邻组件传值</div>
    <div class="title">可以通过点击A组件中的增加按钮，观察B组件的结果显示</div>
    <A />
    <div class="title">---------------------------------------------------</div>
    <B />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import A from './A.vue'
import B from './B.vue'

export default defineComponent({
  components: { A, B }
})
</script>

<style lang="less" scoped></style>
