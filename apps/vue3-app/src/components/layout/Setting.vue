<template>
  <div v-show="!visible" class="setting-drawer-btn-wrap" @click="visible = true">
    <SettingOutlined class="setting-drawer-btn" />
  </div>
  <a-drawer
    v-model:open="visible"
    class="setting-drawer"
    placement="right"
    width="280px"
    :closable="false"
  >
    <template #handle>
      <div
        v-show="visible"
        class="setting-drawer-btn-wrap"
        style="right: 280px; z-index: 2000"
        @click="visible = !visible"
      >
        <CloseOutlined class="setting-drawer-btn" />
      </div>
    </template>
    <div>
      <h3 class="drawer-title">系统布局配置</h3>
      <div class="drawer-item">
        <span>布局方式</span>
        <a-select v-model:value="theme.layout" class="select">
          <a-select-option value="side">侧边</a-select-option>
          <a-select-option value="mix">混合</a-select-option>
        </a-select>
      </div>
      <div class="drawer-item">
        <span>主题色</span>
        <a-select v-model:value="theme.theme" class="select" @change="onChangeTheme">
          <a-select-option value="dark">暗黑</a-select-option>
          <a-select-option value="light">明亮</a-select-option>
        </a-select>
      </div>
      <div class="drawer-item">
        <span>菜单类型</span>
        <a-select v-model:value="theme.mode" class="select">
          <a-select-option value="vertical">垂直</a-select-option>
          <a-select-option value="inline">内嵌</a-select-option>
        </a-select>
      </div>
      <div class="drawer-item">
        <span>顶部高度</span>
        <a-select v-model:value="theme.height" class="select">
          <a-select-option value="48px">48px</a-select-option>
          <a-select-option value="64px">64px</a-select-option>
        </a-select>
      </div>
      <div class="drawer-item">
        <span>侧边栏宽度</span>
        <a-input v-model:value="theme.width" class="select" />
      </div>
      <div class="drawer-item">
        <span>顶部随主题色(混合布局)</span>
        <a-switch v-model:checked="theme.headerTheme" />
      </div>
      <div class="drawer-item">
        <span>侧边栏折叠</span>
        <a-switch v-model:checked="theme.collapsed" />
      </div>
      <div class="drawer-item">
        <span>显示面包屑</span>
        <a-switch v-model:checked="theme.showBreadcrumb" />
      </div>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useTheme } from '@packages/hooks'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: { SettingOutlined, CloseOutlined },
  setup() {
    const visible = ref(false)
    const theme = useTheme()

    onMounted(() => {
      setLocalTheme()
    })

    const setLocalTheme = () => {
      const el = document.querySelector('html')
      el?.classList.toggle('dark', theme.value.theme === 'dark')
    }

    const onChangeTheme = () => {
      setLocalTheme()
    }

    return { visible, theme, onChangeTheme }
  }
})
</script>

<style lang="less" scoped>
.setting-drawer-btn-wrap {
  position: absolute;
  top: 240px;
  right: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  background: theme('colors.primary');
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  pointer-events: auto;
}

.setting-drawer-btn {
  font-size: 18px;
  color: #fff;
}

.drawer-title,
.drawer-item {
  font-size: 14px;
}

.drawer-title {
  line-height: 22px;
  margin: 12px 0;
}

.drawer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;

  .select {
    width: 80px;
  }
}
</style>
