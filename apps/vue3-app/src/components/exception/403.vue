<template>
  <div class="exception-wrap">
    <a-result status="403" title="403" sub-title="抱歉，你无权访问该页面">
      <template #extra>
        <Buttons />
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import Buttons from './buttons.vue'
</script>

<style lang="less" scoped>
@import './index.less';
</style>
