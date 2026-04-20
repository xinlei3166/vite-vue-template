<template>
  <t-card :bordered="false" class="card">
    <div class="title">{{ title }}</div>
  </t-card>
</template>

<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
</script>

<style lang="less" scoped></style>
