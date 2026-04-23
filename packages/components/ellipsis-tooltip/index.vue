<template>
  <span v-if="!text"></span>
  <t-tooltip v-else :title="text" placement="top" :overlay-style="overlayStyle">
    <span class="column-mark" :style="textStyle">
      {{ text }}
    </span>
  </t-tooltip>
</template>

<script setup lang="ts">
const props = defineProps({
  text: { type: String, default: '' },
  overlayStyle: {
    type: Object,
    default: () => ({ maxWidth: '400px', whiteSpace: 'pre-wrap' })
  },
  textStyle: { type: Object, default: () => ({}) }
})
</script>
