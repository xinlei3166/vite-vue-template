<template>
  <a-layout id="layout" :style="{ overflow: 'auto', height: '100vh' }">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <a href="/" class="logo-link">
          <img class="logo-img" src="~@/assets/logo.png" alt="logo" />
          <h1 v-if="!collapsed" class="logo-text">Vue3 Demo</h1>
        </a>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <user-outlined />
            <span>一级菜单</span>
          </template>
          <a-menu-item key="home">Home</a-menu-item>
          <a-menu-item key="vue">Vue</a-menu-item>
          <a-menu-item key="router">Router</a-menu-item>
          <a-menu-item key="store">Store</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <Breadcrumb />
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
export default {
  components: {
    Breadcrumb,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['home'])
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 16px;
  line-height: 32px;
  cursor: pointer;
  .logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }
  .logo-img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
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

#layout {
  ::v-deep(.trigger) {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
