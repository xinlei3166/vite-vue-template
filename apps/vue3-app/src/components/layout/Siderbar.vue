<template>
  <t-aside
    width="auto"
    v-model="theme.collapsed"
    :class="[
      'layout-sider',
      {
        'layout-sider-mix': theme.layout === 'mix',
        'layout-sider-side': theme.layout === 'side',
        'layout-sider-light': theme.theme === 'light'
      }
    ]"
    :style="{
      paddingTop: theme.layout === 'mix' ? `calc(${theme.height} - 0px)` : '',
      width: 'fit-content'
    }"
  >
    <div class="layout-menu-wrap">
      <t-menu
        :width="[theme.width, theme.collapsedWidth]"
        :collapsed="theme.collapsed"
        class="sider-menu"
        :theme="theme.theme"
        :expandType="theme.expandType"
        :expanded="menuState.expanded"
        @expand="onExpand"
        v-model="menuState.selectedValue"
      >
        <template #logo>
          <Logo v-if="theme.layout !== 'mix'" />
        </template>
        <template #operations>
          <div
            class="sider-trigger-wrap"
            @click="
              () => {
                theme.collapsed = !theme.collapsed
              }
            "
          >
            <icon v-if="theme.collapsed" name="icon-indent" class="sider-trigger" />
            <icon v-else name="icon-outdent" class="sider-trigger" />
          </div>
        </template>
        <MenuItem :routes="routes" />
      </t-menu>
    </div>
  </t-aside>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { useArrayDifference } from '@vueuse/core'
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@packages/hooks'
import type { LeftMenu } from '@/store/menu'
import _routes from '@/router/routes'
import { useMenuStore } from '@/store/menu'
import MenuItem from './components/MenuItem.vue'
import Logo from './Logo.vue'

// ====================== Hooks ======================
const route = useRoute()
const store = useMenuStore()
const theme = useTheme()

// ====================== Components ======================
const routes = computed(() => {
  if (__DYNAMIC_MENU__) {
    return store.LeftMenus
  }
  return _routes as Array<LeftMenu>
})
const menuState = reactive<Record<string, any>>({
  rootSubmenuKeys: routes.value.filter(route => route.name).map(route => route.name),
  selectedValue: undefined,
  expanded: []
})

const onExpand = (value: any[]) => {
  const currentOperationMenu = menuState.expanded.filter((item: any) => !value.includes(item))
  const allExpanded = [...new Set([...value, ...menuState.expanded])]
  const newExpanded = allExpanded.filter(item => !currentOperationMenu.includes(item))
  menuState.expanded = newExpanded
}

const changeRoute = (route: RouteLocationNormalized) => {
  const level = route.matched.length
  const routeName = level > 2 ? route.matched[1]?.name : route.name
  const selectedRouteName = route.matched[0]?.meta?.link
    ? (route.matched[0]?.name as string)
    : (routeName as string)
  if (menuState.selectedValue !== selectedRouteName) {
    menuState.selectedValue = selectedRouteName
  }

  // 展开父级菜单
  // const parentNames = route.matched
  //   .slice(0, -1)
  //   .filter(item => item.name && !item.meta?.link)
  //   .map(item => item.name as string)
  // if (parentNames.length) {
  //   setTimeout(() => {
  //     menuState.expanded = [...new Set([...menuState.expanded, ...parentNames])]
  //   }, 100)
  // }
  // 展开单个父级菜单
  const parentRoute = route.matched[0]
  if (parentRoute && !parentRoute.meta?.link) {
    setTimeout(() => {
      menuState.expanded = [parentRoute.name as string]
    }, 100)
  }
}

watch(route, changeRoute, { immediate: true })
</script>

<style lang="less" scoped>
html.dark {
  .sider-trigger:hover {
    color: #fff;
  }
}
.sider-trigger {
  font-size: 18px;
  margin: 0 16px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: theme('colors.brand');
  }
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
}

// scroll bar
.layout-sider :deep(.sider-menu.t-is-collapsed .menu-item-icon) {
  // font-size: 18px !important;
  width: 18px !important;
  height: 18px !important;
}

.layout-sider-side {
  :deep(.sider-menu) {
    .t-menu__logo {
      border-bottom: none;
    }
  }
}

.layout-menu-wrap {
  flex: 1 1 0%;
  width: 100%;
  height: 100%;
  overflow: hidden auto;
  :deep(.sider-menu) {
    height: 100%;
    .t-menu__logo {
      height: v-bind('theme.height');
    }
    .t-menu__operations {
      height: 48px;
    }
    .sider-trigger-wrap {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
