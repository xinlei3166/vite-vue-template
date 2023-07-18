<template>
  <div v-if="selectedRowKeys.length" class="batch-btn-group">
    <slot />
    <span class="clean">
      <span class="clean-text">已选 {{ selectedRowKeys.length }}</span>
      <icon class="clean-icon" type="iconclose-circle-fill" @click="onClean" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// <btn-group v-model:selected-row-keys="selectedRowKeys">
//   <a-button type="primary">分班</a-button>
// </btn-group>

const props = defineProps({
  selectedRowKeys: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:selected-row-keys', 'clean'])

const selectedRowKeys = computed({
  get() {
    return props.selectedRowKeys
  },
  set(val) {
    emit('update:selected-row-keys', val)
  }
})

function onClean() {
  selectedRowKeys.value = []
  emit('clean')
}
</script>

<style lang="less" scoped>
@box-shadow-batch: 0 0 10px 0 rgba(0, 0, 0, 0.3);

.batch-btn-group {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 20px;
  box-shadow: @box-shadow-batch;
  border-radius: 8px;
  background: #fff;
  border: 1px solid @border-color;
  z-index: 100;

  .clean {
    position: absolute;
    right: -16px;
    top: -16px;
    padding: 4px 6px;
    background: #f5222d;
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    box-shadow: @box-shadow-batch;
  }

  .clean-text {
    margin-left: 4px;
  }

  .clean-icon {
    font-size: 16px;
    cursor: pointer;
  }

  .clean-text + .clean-icon {
    margin-left: 10px;
  }
}
</style>
