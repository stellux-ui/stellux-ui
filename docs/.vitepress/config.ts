import { defineConfig } from 'vitepress'
import { resolve } from 'path'

const projRoot = resolve(__dirname, '../..')

export default defineConfig({
  title: 'Stellux UI',
  description: 'A Vue 3 based component library for designers and developers',
  base: '/stellux-ui/',

  head: [['meta', { name: 'theme-color', content: '#6366f1' }]],

  vite: {
    resolve: {
      alias: {
        'stellux-ui': resolve(projRoot, 'packages/stellux-ui/src'),
        '@stellux/components': resolve(projRoot, 'packages/components/src'),
        '@stellux/hooks': resolve(projRoot, 'packages/hooks/src'),
        '@stellux/utils': resolve(projRoot, 'packages/utils/src'),
        '@stellux/directives': resolve(projRoot, 'packages/directives/src'),
        '@stellux/theme': resolve(projRoot, 'packages/theme')
      }
    }
  },

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/button' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Basics',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Theme', link: '/guide/theme' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Basic',
          items: [{ text: 'Button', link: '/components/button' }]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/stellux-ui/stellux-ui' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2026 Stellux UI'
    }
  }
})
