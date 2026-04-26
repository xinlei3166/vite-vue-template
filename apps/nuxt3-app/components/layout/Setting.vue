<template>
  <div>
    <div v-show="!visible" class="setting-drawer-btn-wrap" @click="visible = true">
      <t-icon name="setting-1" class="setting-drawer-btn" />
    </div>
    <t-drawer
      :visible="visible"
      class="setting-drawer"
      placement="right"
      width="300px"
      :header="false"
      :footer="false"
      :closable="false"
      @close="visible = !visible"
    >
      <!-- <div
        v-show="visible"
        class="setting-drawer-btn-wrap"
        style="right: 300px; z-index: 2000"
        @click="visible = !visible"
      >
        <t-icon name="close" class="setting-drawer-btn" />
      </div> -->
      <div class="setting-drawer-content">
        <h3 class="drawer-title">系统布局配置</h3>
        <div class="drawer-item">
          <span>布局方式</span>
          <t-select v-model="theme.layout" class="select">
            <t-option value="side" label="侧边"></t-option>
            <t-option value="mix" label="混合"></t-option>
          </t-select>
        </div>
        <div class="drawer-item">
          <span>风格</span>
          <t-select v-model="theme.theme" class="select" @change="onChangeTheme">
            <t-option value="dark" label="暗黑"></t-option>
            <t-option value="light" label="明亮"></t-option>
          </t-select>
        </div>
        <div class="drawer-item">
          <span>主题色</span>
          <t-select v-model="theme.themeColor" class="select" @change="onChangeThemeColor">
            <template #prefixIcon>
              <span
                class="inline-block"
                :style="{
                  backgroundColor: theme.themeColor,
                  width: '20px',
                  height: '20px'
                }"
              ></span>
            </template>
            <t-option
              v-for="(color, index) in colors"
              :key="color.value"
              :value="color.value"
              :label="color.label"
            />
          </t-select>
        </div>
        <div class="drawer-item">
          <span>菜单类型</span>
          <t-select v-model="theme.expandType" class="select">
            <t-option value="normal" label="平铺"></t-option>
            <t-option value="popup" label="浮层"></t-option>
          </t-select>
        </div>
        <div class="drawer-item">
          <span>顶部高度</span>
          <t-select v-model="theme.height" class="select">
            <t-option value="48px" label="48px"></t-option>
            <t-option value="56px" label="56px"></t-option>
            <t-option value="64px" label="64px"></t-option>
          </t-select>
        </div>
        <div class="drawer-item">
          <span>侧边栏宽度</span>
          <t-input v-model="theme.width" class="select" />
        </div>
        <div class="drawer-item">
          <span>顶部随主题色(混合布局)</span>
          <t-switch v-model="theme.headerTheme" />
        </div>
        <div class="drawer-item">
          <span>侧边栏折叠</span>
          <t-switch v-model="theme.collapsed" />
        </div>
        <div class="drawer-item">
          <span>显示面包屑</span>
          <t-switch v-model="theme.showBreadcrumb" />
        </div>
      </div>
    </t-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useTheme } from '@packages/hooks'
import { changeThemeColor } from '@packages/utils'

const theme = useTheme()
const colors = [
  { label: '默认', value: '#0077fa' },
  { label: '薄暮', value: '#f5222d' },
  { label: '火山', value: '#fa541c' },
  { label: '日暮', value: '#fa8c16' },
  { label: '金盏花', value: '#faad14' },
  { label: '日出', value: '#fadb14' },
  { label: '青柠', value: '#a0d911' },
  { label: '极光绿', value: '#52c41a' },
  { label: '明青', value: '#13c2c2' },
  { label: '拂晓蓝', value: '#1677ff' }
]

export default defineComponent({
  setup() {
    const visible = ref(false)
    const theme = useTheme()

    onMounted(() => {
      setLocalTheme()
      getColor()
    })

    const setLocalTheme = () => {
      const el = document.querySelector('html')
      el?.classList.toggle('dark', theme.value.theme === 'dark')
      el?.setAttribute('theme-mode', theme.value.theme!)
      localStorage.theme = theme.value.theme
    }

    const onChangeTheme = () => {
      setLocalTheme()
    }

    let Color: any = null
    const getColor = async () => {
      if (Color) return Color
      if (import.meta.server) return null

      const mod = await import('tvision-color')
      Color = mod.Color
      return Color
    }

    const onChangeThemeColor = () => {
      const mode = theme.value.theme
      const hex = theme.value.themeColor
      if (!hex) return
      changeThemeColor(hex, mode)
    }

    return { visible, theme, colors, onChangeTheme, onChangeThemeColor }
  }
})
</script>

<style lang="less" scoped>
.setting-drawer-btn-wrap {
  position: absolute;
  top: 240px;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  background: theme('colors.brand');
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
    width: 124px;
  }
}
</style>
