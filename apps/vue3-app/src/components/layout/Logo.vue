<template>
  <div class="layout-logo">
    <router-link to="/" class="logo-link">
      <img class="logo-img" src="~@/assets/logo.png" alt="logo" />
      <h1 v-if="!theme.collapsed || mix" class="logo-text">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@packages/hooks'

const title = import.meta.env.VITE_APP_TITLE
const theme = useTheme()
const width = computed(() => {
  return theme.value.collapsed ? theme.value.collapsedWidth : theme.value.width
})
const mix = computed(() => theme.value.layout === 'mix')
</script>

<style lang="less" scoped>
.layout-logo {
  min-width: v-bind('width');
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: v-bind('theme.height');

  .logo-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }

  .logo-img,
  .logo-text {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }

  .logo-img {
    transition: height 0.2s;
  }

  .logo-text {
    margin: 0 0 0 12px;
    overflow: hidden;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    animation: fade-in;
    animation-duration: 0.2s;
  }
}

.ant-layout-sider-light,
.layout-header-mix {
  .logo-text {
    color: theme('colors.primary');
  }
}

html.dark,
.layout-header-mix.dark,
.layout-header.dark {
  .logo-text {
    color: #fff;
  }
}

.layout-sider.ant-layout-sider-collapsed {
  .layout-logo {
    padding: 16px 24px;
  }
}
</style>
