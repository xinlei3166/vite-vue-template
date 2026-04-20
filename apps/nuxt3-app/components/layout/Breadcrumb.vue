<template>
  <t-breadcrumb>
    <t-breadcrumb-item
      v-for="route in routes"
      :key="route.path"
      @click="onClick(route.meta.firstChildrenRoutePath || route.path)"
    >
      {{ route.meta.title }}
    </t-breadcrumb-item>
  </t-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { uniqueObjArr } from '@packages/utils'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const routes = computed(() => {
      const arr = route.matched
        .filter(route => route.name)
        .map(route => ({
          meta: route.meta,
          content: route.name,
          path: route.path
        }))
      return uniqueObjArr(arr, 'path')
    })

    const lastIndex = computed(() => routes.value.length - 1)

    const onClick = (path: any) => {
      if (path !== route.path) {
        router.push(path).catch(() => {})
      }
    }

    return { routes, lastIndex, onClick }
  }
})
</script>

<style scoped></style>
