<template>
  <a-layout id="layout" :style="{ overflow: 'auto', height: '100vh' }">
    <div
      class="layout-fixed-stuff"
      :style="{ width: theme.collapsed ? theme.collapsedWidth : theme.width }"
    ></div>
    <Siderbar />
    <a-layout>
      <header
        v-if="theme.layout === 'mix'"
        :class="['layout-header-mix', { dark: !theme.headerTheme }]"
      >
        <Logo />
        <a-layout-header class="layout-header">
          <Nav />
        </a-layout-header>
      </header>
      <a-layout-header v-else :class="['layout-header']">
        <Nav />
      </a-layout-header>
      <a-layout-content
        :class="['layout-content-wrap', { 'layout-content-wrap-mix': theme.layout === 'mix' }]"
      >
        <div v-show="theme.showBreadcrumb" class="layout-breadcrumb">
          <Breadcrumb />
        </div>
        <div class="layout-content">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <Setting v-if="isDev" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Nav from './Nav.vue'
import Siderbar from './Siderbar.vue'
import Breadcrumb from './Breadcrumb.vue'
import Setting from './Setting.vue'
import Logo from './Logo.vue'
import { useTheme } from '@packages/hooks'

// ====================== Hooks ======================

// ====================== Components ======================
const isDev = import.meta.env.MODE === 'development'
const router = useRouter()
const theme = useTheme()
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
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  &.dark {
    background: var(--dark-layout-header-background) !important;
    box-shadow: none;
  }

  &.light {
    background: #fff !important;
  }
}

.layout-breadcrumb {
  background: #fff;
  padding: 12px 24px;
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
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  &.dark {
    //background: var(--dark-layout-header-background) !important;
    background: #42577c !important;
  }

  .layout-header {
    box-shadow: none;
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

.layout-content-wrap-mix {
  margin-top: v-bind('theme.height');
}
</style>
