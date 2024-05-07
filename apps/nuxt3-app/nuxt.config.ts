import path from 'path'
import { fileURLToPath } from 'node:url'

// 环境变量配置
import { loadEnv } from 'vite'
const isBuildCommand = command => ['build', 'generate'].includes(command)
const command = process.env.npm_lifecycle_script.match(/nuxi\s(\S+)/)?.[1]
const defaultMode = isBuildCommand(command) ? 'production' : 'development'
const mode = process.env.npm_lifecycle_script.match(/--mode\s(.*)/)?.[1] || defaultMode
const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))
const baseURL = env.VITE_APP_BASE || '/'
Object.assign(process.env, env, {
  MODE: mode,
  BASE_URL: baseURL,
  PROD: isBuildCommand(command),
  DEV: command === 'dev'
  // SSR: false
})
console.log('mode', mode)
console.log('env', env)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  ssr: process.env.NODE_ENV !== 'development', // fix antdv ssr warning
  alias: {
    features: fileURLToPath(new URL('../../features', import.meta.url))
  },
  baseURL,
  // buildDir: env.VITE_OUTDIR || '.nuxt',
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue', '.json', '.less', '.scss', '.css'],
  devtools: { enabled: true },
  modules: [
    '@ant-design-vue/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  // plugins: ['~/plugins/external'],
  nitro: {
    devProxy: {
      [env.VITE_API_URL]: {
        target: env.VITE_PROXY_TARGET,
        changeOrigin: true,
        secure: false
        // rewrite: path => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
      }
    },
    esbuild: {
      // drop: command === 'build' ? ['console', 'debugger'] : []
      drop: []
    }
    // prerender: {
    //   failOnError: false
    // }
  },
  // routeRules: {
  //   '/': { prerender: false }
  // },
  // appConfig: {},
  // runtimeConfig: {},
  vite: {
    // optimizeDeps: { include: [] },
    ssr: { noExternal: ['vue-echarts'] },
    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
      __DYNAMIC_MENU__: env.VITE_DYNAMIC_MENU
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // modifyVars: {},
          additionalData: `@import "@packages/styles/theme.less";`
        }
      }
    }
  },
  postcss: {
    plugins: {
      '@unocss/postcss': {}
    }
  }
})
