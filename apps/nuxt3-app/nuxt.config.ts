import { fileURLToPath } from 'node:url'
import path from 'path'
// 环境变量配置
import { loadEnv } from 'vite'
const isBuildCommand = (command: any) => ['build', 'generate'].includes(command)
// @ts-ignore
const command = process.env.npm_lifecycle_script.match(/nuxi\s(\S+)/)?.[1]
const defaultMode = isBuildCommand(command) ? 'production' : 'development'
// @ts-ignore
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
  alias: {
    features: fileURLToPath(new URL('../../features', import.meta.url)),
    '@layout': fileURLToPath(new URL('../vue3-app/src/components/layout', import.meta.url)),
    '@exception': fileURLToPath(new URL('../vue3-app/src/components/exception', import.meta.url))
  },
  baseURL,
  // buildDir: env.VITE_OUTDIR || '.nuxt',
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue', '.json', '.less', '.scss', '.css'],
  devtools: { enabled: true },
  modules: [
    '@tdesign-vue-next/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  // plugins: ['~/plugins/external'],
  nitro: {
    // @ts-ignore
    devProxy: {
      [env.VITE_API_URL]: {
        target: env.VITE_PROXY_TARGET,
        changeOrigin: true,
        secure: false,
        rewrite: (path: any) => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
      }
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
        // less: {
        //   javascriptEnabled: true,
        //   modifyVars: {
        //     '@brand-color': '#0077FA'
        //   },
        //   additionalData: `@import "@packages/styles/theme.less";`
        // }
      }
    }
  },
  postcss: {
    plugins: {
      '@unocss/postcss': {}
    }
  }
})
