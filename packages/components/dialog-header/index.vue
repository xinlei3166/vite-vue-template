<template>
  <div class="dialog-header-title">
    <span>{{ title }}</span>
    <div class="dialog-header-btn-group">
      <!-- 全屏 -->
      <t-tooltip v-if="!state.fullscreen" placement="bottom" content="全屏">
        <t-button theme="default" shape="square" variant="text" @click="onClickFullscreen(true)">
          <img :src="IconFullscreen" class="dialog-header-btn" />
        </t-button>
      </t-tooltip>
      <!-- 取消全屏 -->
      <t-tooltip v-else placement="bottom" content="取消全屏">
        <t-button theme="default" shape="square" variant="text" @click="onClickFullscreen(false)">
          <img :src="IconFullscreenExit" class="dialog-header-btn" />
        </t-button>
      </t-tooltip>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { reactive } from 'vue'
import IconFullscreenExit from './icon/icon-fullscreen-exit.svg'
import IconFullscreen from './icon/icon-fullscreen.svg'

defineProps({
  title: {
    type: String,
    default: '标题'
  }
})

const emit = defineEmits(['dialog-fullscreen'])

const state = reactive<Record<string, any>>({
  fullscreen: false
})

const onClickFullscreen = (val: boolean) => {
  state.fullscreen = val
  emit('dialog-fullscreen', state.fullscreen)
}
</script>
<style lang="less" scoped>
.dialog-header-title {
  flex: 1;
  display: flex;
  align-items: center;
}

.dialog-header-btn-group {
  margin-left: auto;
  display: inline-flex;
}

.dialog-header-btn {
  width: 16px;
  // color: #333333;
}
</style>
