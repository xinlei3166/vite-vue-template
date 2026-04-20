import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { loadEnv, defineConfig } from 'vite'

// @ts-ignore
export default ({ mode, command }) => {
  const isBuild = command === 'build'
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
      outDir: env.VITE_OUTDIR || 'dist',
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              dropConsole: isBuild,
              dropDebugger: isBuild
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
          // modifyVars: {
          //   '@brand-color': '#0077FA'
          // },
          // additionalData: `@import "@packages/styles/theme.less";`
        }
      }
    },
    plugins: [
      vue(),
      jsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ],
        dts: false
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ]
      })
      // {
      //   name: 'html-transform',
      //   transformIndexHtml(html) {
      //     return {
      //       html: html.replace('%title%', env.VITE_APP_TITLE),
      //       tags: [
      //         {
      //           tag: 'script',
      //           attrs: { src: './inject.js' },
      //           injectTo: 'head'
      //         }
      //       ]
      //     }
      //   }
      // }
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
    server: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
        }
      }
    }
  })
}
