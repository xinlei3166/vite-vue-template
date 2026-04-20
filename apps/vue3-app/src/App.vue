<template>
  <t-config-provider :global-config="globalConfig" :theme="theme">
    <router-view />
  </t-config-provider>
</template>

<script lang="ts" setup>
import type { GlobalConfigProvider } from 'tdesign-vue-next'
import dayjs from 'dayjs'
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@packages/hooks'
import { getToken } from '@packages/utils'
import { checkExternalWhiteRoute } from '@/router'
import { useUserStore } from '@/store/user'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

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
</script>

<style></style>
