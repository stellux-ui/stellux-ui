import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'StelluxUI',
      fileName: format => `stellux-ui.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  },
  resolve: {
    alias: {
      '@stellux/components': resolve(__dirname, '../components/src'),
      '@stellux/hooks': resolve(__dirname, '../hooks/src'),
      '@stellux/utils': resolve(__dirname, '../utils/src'),
      '@stellux/directives': resolve(__dirname, '../directives/src'),
      '@stellux/theme': resolve(__dirname, '../theme')
    }
  }
})
