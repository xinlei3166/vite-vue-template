import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
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
  // base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
