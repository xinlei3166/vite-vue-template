<template>
  <component :is="isNuxt() ? 'NuxtPage' : 'RouterView'" />
</template>

<script>
import { isNuxt } from '@packages/utils'
</script>

<style scoped></style>
