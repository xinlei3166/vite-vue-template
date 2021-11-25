import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import { injectHtml } from 'vite-plugin-html'
import path from 'path'

// @ts-ignore
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const base = mode === 'github' ? env.VITE_APP_BASE : '/'

  return defineConfig({
    plugins: [
      vue(),
      injectHtml({
        injectData: {
          // html usage: <%= VITE_APP_ENV %>
          VITE_APP_ENV: env.VITE_APP_ENV
          // injectScript: '<script src="./inject.js"></script>'
        }
      }),
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: name => {
              return `ant-design-vue/es/${name}/style/css`
            }
          }
        ]
      })
    ],
    base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  })
}
