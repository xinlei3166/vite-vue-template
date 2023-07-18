<template>
  <a-modal :open="open" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="src" />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    open: { type: Boolean, default: false },
    src: { type: String, default: '' }
  },
  setup(props, { emit, attrs }) {
    const handleCancel = () => emit('update:visible', false)
    return {
      handleCancel
    }
  }
})
</script>
