import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// @ts-ignore
export default ({ mode, command }) => {
  console.log('mode', mode)
  // const env = loadEnv(mode, process.cwd())
  const envDir = path.resolve(process.cwd(), 'env')
  const env = loadEnv(mode, envDir)
  console.log('env', env)

  return defineConfig({
    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
      __DYNAMIC_MENU__: env.VITE_DYNAMIC_MENU
    },
    envDir,
    build: {
      outDir: env.VITE_OUTDIR || 'dist'
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // modifyVars: {},
          additionalData: `@import "@packages/styles/theme.less";`
        }
      }
    },
    plugins: [
      vue(),
      jsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: false
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // title: env.VITE_APP_TITLE,
            // injectScript: `<script src="./inject.js"></script>`
          }
        }
      })
    ],
    base: env.VITE_APP_BASE || '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        vue: 'vue/dist/vue.esm-bundler.js',
        features: path.resolve(__dirname, '../../features')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue', '.json', '.less', '.scss', '.css']
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : []
    },
    server: {
      // proxy: {
      //   [env.VITE_API_URL]: {
      //     target: env.VITE_PROXY_TARGET,
      //     changeOrigin: true,
      //     secure: false
      //     // rewrite: path => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
      //   }
      // }
    }
  })
}
