import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'stellux-ui': resolve(__dirname, '../packages/stellux-ui/src'),
      '@stellux/components': resolve(__dirname, '../packages/components/src'),
      '@stellux/hooks': resolve(__dirname, '../packages/hooks/src'),
      '@stellux/utils': resolve(__dirname, '../packages/utils/src'),
      '@stellux/directives': resolve(__dirname, '../packages/directives/src'),
      '@stellux/theme': resolve(__dirname, '../packages/theme')
    }
  }
})
