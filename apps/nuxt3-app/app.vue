<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useUserStore } from '@/store/user'
import { useTheme } from '@packages/hooks'
import TokenContextHolder from '@packages/token/TokenContextHolder.vue'
import { getToken } from '@packages/utils'
import { checkExternalWhiteRoute, whiteList } from '@/router'
// import { theme as antdTheme } from 'ant-design-vue'
// import { token } from '../config/theme'

// style
import '@packages/styles/index.less'
import '@packages/styles/reset.less'
import '@/styles/index.less'
import 'animate.css'

// dayjs
import dayjs from 'dayjs'
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

const configProvider = computed(() => ({
  locale: zhCN,
  // @ts-ignore
  // theme: { token: theme.value.token, algorithm: antdTheme[theme.value.algorithm] }
  theme: { token: theme.value.token }
}))

const layout = computed(() => {
  if (whiteList.includes(router.currentRoute.value.path)) {
    return false
  }
  return 'default'
})
</script>

<template>
  <a-config-provider v-bind="configProvider">
    <TokenContextHolder />
    <NuxtLoadingIndicator color="#1677ff" />
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>

<style lang="ts" scoped></style>
