<template>
  <t-card :bordered="false" v-if="wrapper === 'card'" v-bind="wrapperProps">
    <slot />
  </t-card>
  <slot v-else />
</template>
<script setup lang="ts">
defineProps({
  wrapper: { type: String, default: undefined },
  wrapperProps: { type: Object, default: () => ({}) }
})
</script>
<style lang="less" scoped></style>
