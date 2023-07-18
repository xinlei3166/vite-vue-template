<template>
  <div class="exception-wrap">
    <a-result status="500" title="500" sub-title="抱歉，服务器出错了">
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
