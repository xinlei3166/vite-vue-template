<template>
  <a-layout id="layout" :style="{ overflow: 'auto', height: '100vh' }">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :class="['layout-sider', { 'show-name': showSubMenuName }]"
      :trigger="null"
      collapsible
      width="208"
      collapsed-width="80"
    >
      <div class="logo">
        <router-link to="/" class="logo-link">
          <img class="logo-img" src="~@/assets/logo.png" alt="logo" />
          <h1 v-if="!collapsed" class="logo-text">Vue3 Demo</h1>
        </router-link>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" class="sider-menu" theme="dark" mode="inline">
        <template v-for="route in routes" :key="route.name">
          <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
            <template #title>
              <icon :type="route.meta.icon" class="icon"></icon>
              <span>{{ route.meta.title }}</span>
            </template>
            <template v-for="sub in route.children" :key="sub.name">
              <a-menu-item v-if="!sub.meta.hidden" :key="sub.name">
                <router-link :to="{ name: sub.name }">{{ sub.meta.title }}</router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <Nav />
      </a-layout-header>
      <div class="layout-breadcrumb">
        <Breadcrumb />
      </div>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Nav from './Nav.vue'
import Breadcrumb from './Breadcrumb.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import routes from '../../router/routes'

export default defineComponent({
  components: {
    Nav,
    Breadcrumb,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup() {
    return {
      collapsed: ref(false),
      showSubMenuName: ref(true), // 控制左侧菜单折叠时，是否显示文字
      selectedKeys: ref(['home']),
      routes
    }
  }
})
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

#layout {
  ::v-deep(.trigger) {
    font-size: 20px;
    margin: 0 16px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
}

.layout-sider.ant-layout-sider-collapsed {
  .logo {
    padding: 16px 24px;
  }

  .ant-menu-submenu-title .anticon {
    font-size: 16px;
  }
}

.layout-sider.ant-layout-sider-collapsed.show-name {
  .ant-menu-submenu {
    padding-bottom: 16px;
  }

  ::v-deep(.ant-menu-submenu-title) {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ant-menu-submenu-title .anticon {
    line-height: 1;
    transition: none;
  }

  .ant-menu-submenu-title .anticon + span {
    max-width: unset;
    opacity: unset;
    line-height: 26px;
  }
}

.layout-header {
  background: #fff;
  padding: 0 16px;
  height: 48px;
  line-height: 48px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.layout-breadcrumb {
  background: #fff;
  padding: 12px 24px;
}

.layout-content {
  padding: 24px;
}
</style>
