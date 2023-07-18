<template>
  <a-layout-sider
    v-model:collapsed="theme.collapsed"
    :class="['layout-sider', { 'layout-sider-mix': theme.layout === 'mix' }]"
    :theme="theme.theme"
    collapsible
    :width="theme.width"
    :collapsed-width="theme.collapsedWidth"
  >
    <template #trigger>
      <menu-unfold-outlined v-if="theme.collapsed" class="trigger" />
      <menu-fold-outlined v-else class="trigger" />
    </template>
    <Logo v-if="theme.layout !== 'mix'" />
    <div class="layout-menu-wrap">
      <a-menu
        v-model:selectedKeys="menuState.selectedKeys"
        :open-keys="menuState.openKeys"
        class="sider-menu"
        :theme="theme.theme"
        :mode="theme.mode"
        @openChange="onOpenChange"
        @click="onClickMenu"
      >
        <template v-for="route in routes" :key="route.name">
          <a-menu-item
            v-if="route.meta.link && !route.meta.hidden"
            :key="route.name"
            class="menu-item-link"
          >
            <template #icon>
              <icon :type="route.meta.icon" class="menu-item-icon"></icon>
            </template>
            <span class="menu-item-title">{{ route.meta.title }}</span>
          </a-menu-item>
          <a-sub-menu v-else-if="!route.meta.hidden" :key="route.name">
            <template #icon>
              <icon :type="route.meta.icon" class="menu-item-icon"></icon>
            </template>
            <template #title>
              <span class="menu-item-title">{{ route.meta.title }}</span>
            </template>
            <template v-for="sub in route.children" :key="sub.name">
              <a-menu-item v-if="!sub.meta.hidden" :key="sub.name">
                <!--                <template #icon>-->
                <!--                  <icon :type="sub.meta.icon" class="menu-item-icon"></icon>-->
                <!--                </template>-->
                <span class="menu-item-title">{{ sub.meta.title }}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { useTheme } from '@packages/hooks'
import type { LeftMenu } from '@/store/menu'
import { useMenuStore } from '@/store/menu'
import _routes from '@/router/routes'
import Logo from './Logo.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

// ====================== Hooks ======================
const router = useRouter()
const store = useMenuStore()
const theme = useTheme()

// ====================== Components ======================
const routes = computed(() => {
  if (__DYNAMIC_MENU__) {
    return store.LeftMenus
  }
  return _routes as Array<LeftMenu>
})
const menuState = reactive({
  rootSubmenuKeys: routes.value.filter(route => route.name).map(route => route.name),
  openKeys: [] as string[],
  selectedKeys: [] as string[]
})

const changeRoute = (route: RouteLocationNormalized) => {
  const level = route.matched.length
  const routeName = level > 2 ? route.matched[1]?.name : route.name
  const selectedRouteName = route.matched[0]?.meta?.link
    ? (route.matched[0]?.name as string)
    : (routeName as string)
  if (!menuState.selectedKeys.includes(selectedRouteName)) {
    menuState.selectedKeys = [selectedRouteName]
  }
  if (!theme.value.collapsed) {
    menuState.openKeys = [route.matched[0]?.name as string]
  }
}

watch(router.currentRoute, changeRoute, { immediate: true })

const onOpenChange = (openKeys: string[]) => {
  menuState.openKeys = openKeys
}

const onClickMenu = ({ key }: any) => {
  router.push({ name: key })
}

const onCollapsed = () => {
  theme.value.collapsed = !theme.value.collapsed
  if (theme.value.collapsed) {
    menuState.openKeys = []
  } else {
    changeRoute(router.currentRoute.value)
  }
}
</script>

<style lang="less" scoped>
.trigger {
  font-size: 16px;
  margin: 0 16px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: theme('colors.primary');
  }
}

:deep(.ant-layout-sider-trigger) {
  padding: 0 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: transparent;
}

.menu-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-item-icon {
  font-size: 16px !important;
  vertical-align: -0.2em !important;
}

.layout-sider :deep(.ant-menu-sub.ant-menu-inline) {
  //background: 0 0;
}

// :deep(.ant-menu-inline .ant-menu-item) remove width
.layout-sider :deep(.ant-menu-inline .ant-menu-submenu-title) {
  width: 100%;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
}

.layout-sider.ant-layout-sider-collapsed {
  :deep(.ant-menu-submenu-title) {
    margin-bottom: 8px;
  }

  .menu-item-icon {
    font-size: 18px !important;
  }
}

// scroll bar
.layout-sider :deep(.ant-layout-sider-children ::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

.layout-sider :deep(.ant-layout-sider-children ::-webkit-scrollbar-thumb) {
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 5px hsl(0deg 0% 100% / 5%);
}

.ant-layout-sider-light :deep(.ant-layout-sider-children ::-webkit-scrollbar-thumb) {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
}

.layout-sider :deep(.ant-layout-sider-children ::-webkit-scrollbar-track) {
  //background: hsla(0, 0%, 100%, 0.15);
  border-radius: 3px;
  //-webkit-box-shadow: inset 0 0 5px rgb(37 37 37 / 5%);
}

.ant-layout-sider-light :deep(.ant-layout-sider-children ::-webkit-scrollbar-track) {
  //background: rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  //-webkit-box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
}

.layout-sider :deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.layout-menu-wrap {
  flex: 1 1 0%;
  width: 100%;
  overflow: hidden auto;
}

// about theme
.ant-layout-sider-dark {
  :deep(.ant-menu-submenu-active),
  :deep(.ant-menu-submenu-open) {
    color: #fff;
  }
}

.ant-layout-sider-light {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}

.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right-color: transparent;
  border-inline-end-color: transparent !important;
}

.layout-sider-mix {
  padding-top: calc(v-bind('theme.height') + 4px);
}

html.dark {
  .trigger {
    color: theme('colors.brandDark.text2');
    &:hover {
      color: #fff !important;
    }
  }
  .ant-layout-sider-trigger {
    border: none;
  }
}
</style>
