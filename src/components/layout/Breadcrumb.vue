<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.meta.title }}
      </span>
      <router-link v-else :to="'/' + paths.join('/')">
        {{ route.meta.title }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const routes = computed(() => {
      return router.currentRoute.value.matched
        .filter(route => route.name)
        .map(route => ({
          meta: route.meta,
          name: route.name,
          path: route.path
        }))
    })

    return { routes }
  }
})
</script>

<style scoped></style>
