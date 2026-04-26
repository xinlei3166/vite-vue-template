import { fileURLToPath } from 'node:url'
import path from 'path'
import { loadEnv } from 'vite'

// 环境变量配置
const isBuildCommand = (command: any) => ['build', 'generate'].includes(command)
// @ts-ignore
const command = process.env.npm_lifecycle_script.match(/nuxi\s(\S+)/)?.[1]
const defaultMode = isBuildCommand(command) ? 'production' : 'development'
// @ts-ignore
// const mode = process.env.npm_lifecycle_script.match(/--mode\s(.*)/)?.[1] || defaultMode
const mode = process.env.npm_lifecycle_script?.match(/NUXT_ENV=(\S+)/)?.[1] || defaultMode
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
  compatibilityDate: '2024-04-03',
  // ssr: false,
  // envDir: './env',
  alias: {
    features: fileURLToPath(new URL('../../features', import.meta.url))
  },
  app: {
    baseURL: env.VITE_APP_BASE || '/'
  },
  devtools: { enabled: true },
  // extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue', '.json', '.less', '.scss', '.css'],
  modules: [
    '@tdesign-vue-next/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  nitro: {
    // @ts-ignore
    devProxy: {
      [env.VITE_API_URL as any]: {
        target: env.VITE_PROXY_TARGET,
        changeOrigin: true,
        secure: false,
        rewrite: (path: any) => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
      }
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@material/material-color-utilities',
        'ts-ignore',
        'dayjs', // CJS
        'dayjs/locale/zh-cn', // CJS
        'mockjs', // CJS
        'qs', // CJS
        'nprogress', // CJS
        'mitt',
        'sortablejs',
        'dayjs/plugin/weekday', // CJS
        'exceljs', // CJS
        'js-cookie',
        'nanoid',
        'vue-echarts',
        '@ant-design/colors',
        'cos-js-sdk-v5', // CJS
        'axios'
      ]
    },
    ssr: {
      noExternal: ['vue-echarts']
    },
    server: {
      fs: {
        // 允许 Vite 访问更上级的 node_modules
        allow: ['..']
      }
    },
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
  future: {
    compatibilityVersion: 4
  },
  postcss: {
    plugins: {
      '@unocss/postcss': {}
    }
  }
})
