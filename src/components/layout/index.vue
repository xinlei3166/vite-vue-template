<template>
  <a-layout id="layout" :style="{ overflow: 'auto', height: '100vh' }">
    <div class="layout-fixed-stuff" :style="{ width: collapsed ? collapsedWidth : width }"></div>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :class="['layout-sider', { 'show-name': showSubMenuName }]"
      :theme="theme"
      :trigger="null"
      collapsible
      :width="width"
      :collapsed-width="collapsedWidth"
    >
      <div class="logo">
        <router-link to="/" class="logo-link">
          <img class="logo-img" src="~@/assets/logo.png" alt="logo" />
          <h1 v-if="!collapsed" class="logo-text">Vue3 Demo</h1>
        </router-link>
      </div>
      <div class="layout-menu-wrap">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          :open-keys="openKeys"
          class="sider-menu"
          :theme="theme"
          :mode="mode"
          @openChange="onOpenChange"
        >
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
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="onCollapsed" />
        <menu-fold-outlined v-else class="trigger" @click="onCollapsed" />
        <Nav />
      </a-layout-header>
      <a-layout-content class="layout-content-wrap">
        <div v-show="showBreadcrumb" class="layout-breadcrumb">
          <Breadcrumb />
        </div>
        <div class="layout-content">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <Setting />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs } from 'vue'
import Nav from './Nav.vue'
import Breadcrumb from './Breadcrumb.vue'
import Setting from './Setting.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import routes from '../../router/routes'
import { useRouter, RouteLocationNormalized } from 'vue-router'
import { useTheme } from '@/hooks/theme'

export default defineComponent({
  components: {
    Nav,
    Breadcrumb,
    Setting,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup() {
    const menuState = reactive({
      rootSubmenuKeys: routes.filter(route => route.name).map(route => route.name),
      openKeys: [] as string[],
      selectedKeys: [] as string[]
    })

    const router = useRouter()
    const theme = useTheme()

    const changeRoute = (route: RouteLocationNormalized) => {
      if (!menuState.selectedKeys.includes(route.name as string)) {
        menuState.selectedKeys = [route.name as string]
      }
      menuState.openKeys = [route.matched[0]?.name as string]
    }

    watch(router.currentRoute, changeRoute, { immediate: true })

    const onOpenChange = (openKeys: string[]) => {
      menuState.openKeys = openKeys
    }

    const onCollapsed = () => {
      theme.collapsed = !theme.collapsed
      if (theme.collapsed) {
        menuState.openKeys = []
      } else {
        changeRoute(router.currentRoute.value)
      }
    }

    return {
      routes,
      ...toRefs(theme),
      ...toRefs(menuState),
      onOpenChange,
      onCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
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

::v-deep(.ant-menu-submenu-title) {
  display: flex;
  align-items: center;

  .anticon {
    font-size: 16px;
  }
}

.layout-sider ::v-deep(.ant-menu-inline .ant-menu-item),
::v-deep(.ant-menu-inline .ant-menu-submenu-title) {
  width: 100%;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
}

.layout-fixed-stuff {
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.2s;
}

.layout-sider.ant-layout-sider-collapsed {
  .logo {
    padding: 16px 24px;
  }

  ::v-deep(.ant-menu-submenu-title) {
    margin-bottom: 8px;
  }

  .ant-menu-submenu-title .anticon {
    font-size: 18px;
  }
}

.layout-sider.ant-layout-sider-collapsed.show-name {
  .ant-menu-submenu {
    padding-bottom: 20px;
  }

  ::v-deep(.ant-menu-submenu-title) {
    padding: 0 !important;
    flex-direction: column;
  }

  .ant-menu-submenu-title .anticon {
    line-height: 1;
    transition: none;
  }

  .ant-menu-submenu-title .anticon + span {
    max-width: unset;
    opacity: unset;
    line-height: 24px;
  }
}

.layout-header {
  background: #fff;
  padding: 0 16px;
  height: 48px;
  line-height: 48px;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
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
  padding: 20px;
}

// scroll bar
.layout-sider ::v-deep(.ant-layout-sider-children ::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

.layout-sider ::v-deep(.ant-layout-sider-children ::-webkit-scrollbar-thumb) {
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 5px hsl(0deg 0% 100% / 5%);
}

.ant-layout-sider-light ::v-deep(.ant-layout-sider-children ::-webkit-scrollbar-thumb) {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
}

.layout-sider ::v-deep(.ant-layout-sider-children ::-webkit-scrollbar-track) {
  //background: hsla(0, 0%, 100%, 0.15);
  border-radius: 3px;
  //-webkit-box-shadow: inset 0 0 5px rgb(37 37 37 / 5%);
}

.ant-layout-sider-light ::v-deep(.ant-layout-sider-children ::-webkit-scrollbar-track) {
  //background: rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  //-webkit-box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
}

.layout-sider ::v-deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 24px;
}

.layout-menu-wrap {
  flex: 1 1 0%;
  overflow: hidden auto;
}

// about theme
.ant-layout-sider-light {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);

  .logo-text {
    color: #1890ff;
  }
}

.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right-color: transparent;
}
</style>
