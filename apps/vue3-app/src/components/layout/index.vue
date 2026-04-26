<template>
  <t-layout
    v-if="showLayout"
    id="layout"
    :style="{
      flexDirection: 'row',
      overflow: 'auto',
      height: '100vh'
    }"
  >
    <div
      class="layout-fixed-stuff"
      :style="{ width: theme.collapsed ? theme.collapsedWidth : theme.width }"
    ></div>
    <Siderbar />
    <t-layout style="min-width: 0">
      <header
        v-if="theme.layout === 'mix'"
        :class="['layout-header-mix', { dark: !theme.headerTheme }]"
      >
        <Logo />
        <t-header class="layout-header">
          <Nav />
        </t-header>
      </header>
      <t-header
        v-else
        :class="['layout-header', { light: theme.theme === 'light', dark: theme.theme === 'dark' }]"
      >
        <Nav />
      </t-header>
      <t-content
        :class="['layout-content-wrap', { 'layout-content-wrap-mix': theme.layout === 'mix' }]"
        :style="{
          marginTop: theme.layout === 'mix' ? theme.height : ''
        }"
      >
        <div v-show="theme.showBreadcrumb" class="layout-breadcrumb">
          <Breadcrumb />
        </div>
        <div class="layout-content">
          <router-view />
        </div>
      </t-content>
    </t-layout>
    <Setting v-if="isDev" />
  </t-layout>
  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@packages/hooks'
import Breadcrumb from './Breadcrumb.vue'
import Logo from './Logo.vue'
import Nav from './Nav.vue'
import Setting from './Setting.vue'
import Siderbar from './Siderbar.vue'

const isDev = ['development', 'github'].includes(import.meta.env.MODE)
const router = useRouter()
const theme = useTheme()
const showLayout = computed(() => window.self === window.top && !window.__POWERED_BY_WUJIE__)
</script>

<style lang="less" scoped>
.layout-fixed-stuff {
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.2s;
}

.layout-header {
  background: #fff;
  padding: 0 16px;
  height: v-bind('theme.height');
  line-height: v-bind('theme.height');
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // box-shadow: 0 1px 4px #00152914;
  border-bottom: 1px solid var(--td-component-stroke);
  &.dark {
    background: var(--dark-layout-header-background) !important;
  }
  &.light {
    background: var(--td-bg-color-container) !important;
  }
}

.layout-breadcrumb {
  background: var(--td-bg-color-page);
  padding: 16px 16px 0;
  flex-shrink: 0;
}

.layout-content-wrap {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.layout-content {
  flex: auto;
  padding: 16px;
  min-height: 0;
}

.layout-header-mix {
  position: fixed;
  top: 0;
  right: 0;
  height: v-bind('theme.height');
  line-height: v-bind('theme.height');
  width: 100%;
  z-index: 200;
  display: flex;
  background: #fff;
  // box-shadow: 0 1px 4px #00152914;
  border-bottom: 1px solid var(--td-component-stroke);
  &.dark {
    background: var(--dark-layout-header-background) !important;
  }
  .layout-header {
    box-shadow: none;
    border-bottom: none;
    background: transparent !important;
    flex: 1;
  }
}

// theme
html.dark {
  .layout-header-mix {
    background: var(--dark-layout-header-background);
  }
}
</style>
