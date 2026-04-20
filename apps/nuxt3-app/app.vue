<script setup lang="ts">
import type { GlobalConfigProvider } from 'tdesign-vue-next'
import dayjs from 'dayjs'
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'
import { computed, onMounted } from 'vue'
import { useTheme } from '@packages/hooks'
import { getToken } from '@packages/utils'
import { checkExternalWhiteRoute, whiteList } from '@/router'
import '@packages/styles/index.less'
import '@packages/styles/reset.less'
import '@/styles/index.less'
import 'animate.css'
import { useUserStore } from '@/store/user'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

useHead({
  title: import.meta.env.VITE_APP_TITLE,
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  // bodyAttrs: {
  //   class: ''
  // },
  // script: []
})

const router = useRouter()
const userStore = useUserStore()
const theme = useTheme()

const routePath = computed(() => {
  return window.location.pathname.replace(import.meta.env.BASE_URL, '/')
})

onMounted(async () => {
  if (checkExternalWhiteRoute(routePath.value)) return
  const token = getToken()
  if (!token) return
  await userStore.setUserinfo()
  await userStore.setPermissions()
  if (window.__POWERED_BY_WUJIE__) {
    // @ts-ignore
    window.$wujie?.bus.$on('vue3-app-router-change', (name: string, path: string) => {
      router.push({ path })
    })
  }
})

const globalConfig: GlobalConfigProvider = zhConfig as any

const layout = computed(() => {
  if (whiteList.includes(router.currentRoute.value.path)) {
    return false
  }
  return 'default'
})
</script>

<template>
  <t-config-provider :global-config="globalConfig" :theme="theme">
    <NuxtLoadingIndicator color="var(--td-primary-color)" />
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </t-config-provider>
</template>

<style lang="ts" scoped></style>
