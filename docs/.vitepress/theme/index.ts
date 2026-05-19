import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import StelluxUI from 'stellux-ui'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(StelluxUI)
  }
} satisfies Theme
