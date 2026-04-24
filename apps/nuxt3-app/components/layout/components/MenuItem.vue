<template>
  <div>
    <template v-for="route in visibleRoutes">
      <t-menu-item
        v-if="route.meta.link || !route.children?.length"
        :key="route.name"
        :value="route.name"
        :to="{ name: route.name }"
      >
        <template #icon>
          <icon :name="route.meta.icon" class="menu-item-icon"></icon>
        </template>
        {{ route.meta.title }}
      </t-menu-item>
      <t-submenu v-else :key="'submenu' + route.name" :value="route.name" :title="route.meta.title">
        <template #icon>
          <icon :name="route.meta.icon" class="menu-item-icon"></icon>
        </template>
        <MenuItem v-if="route.children?.length > 0" :routes="route.children" />
      </t-submenu>
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { LeftMenu } from '@/store/menu'

export default defineComponent({
  name: 'MenuItem',
  props: {
    routes: {
      type: Array as PropType<LeftMenu[]>,
      default: () => []
    }
  },
  computed: {
    visibleRoutes(): LeftMenu[] {
      return this.routes.filter(route => !route.meta?.hidden && route.path)
    }
  }
})
</script>
<style lang="less" scoped>
.menu-item-icon {
  width: 18px !important;
  height: 18px !important;
}
</style>
