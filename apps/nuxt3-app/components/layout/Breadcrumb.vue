<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, routes }">
      <span v-if="routes.indexOf(route) === lastIndex">
        {{ route.meta.title }}
      </span>
      <NuxtLink v-else :to="route.meta.firstChildrenRoutePath || route.path">
        {{ route.meta.title }}
      </NuxtLink>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { uniqueObjArr } from '@packages/utils'

export default defineComponent({
  setup() {
    const router = useRouter()
    const routes = computed(() => {
      const arr = router.currentRoute.value.matched
        .filter(route => route.name)
        .map(route => ({
          meta: route.meta,
          name: route.name,
          path: route.path
        }))
      return uniqueObjArr(arr, 'path')
    })

    const lastIndex = computed(() => routes.value.length - 1)

    return { routes, lastIndex }
  }
})
</script>

<style scoped></style>
