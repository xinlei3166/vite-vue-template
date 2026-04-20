<template>
  <t-dialog v-model:visible="visible" :footer="false">
    <img alt="example" style="width: 100%" :src="src" />
  </t-dialog>
</template>

<script lang="ts" setup>
defineProps({
  src: { type: String, default: '' }
})
const visible = defineModel('visible', {
  type: Boolean,
  default: false
})
const emit = defineEmits([])
</script>
