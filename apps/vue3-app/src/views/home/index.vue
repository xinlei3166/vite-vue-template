<template>
  <a-card class="card">
    <div class="title">{{ title }}</div>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = import.meta.env.VITE_APP_TITLE
</script>

<style lang="less" scoped></style>
