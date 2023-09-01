<template>
  <a-config-provider v-bind="configProvider">
    <TokenContextHolder />
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useUserStore } from '@/store/user'
import { useTheme } from '@packages/hooks'
// import { theme as antdTheme } from 'ant-design-vue'
import TokenContextHolder from '@packages/token/TokenContextHolder.vue'
import { getToken } from '@packages/utils'
import { checkExternalWhiteRoute } from '@/router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

// import { token } from '../config/theme'

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
</script>

<style></style>
