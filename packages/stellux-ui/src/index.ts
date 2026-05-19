import type { App } from 'vue'
import {
  StxButton, StxButtonGroup,
  StxContainer, StxHeader, StxFooter, StxAside, StxMain,
  StxRow, StxCol,
} from '@stellux/components'
import { vRipple } from '@stellux/directives'
import '@stellux/theme/src/index.scss'

const components = [
  StxButton, StxButtonGroup,
  StxContainer, StxHeader, StxFooter, StxAside, StxMain,
  StxRow, StxCol,
]

export function install(app: App) {
  components.forEach((component) => {
    app.use(component)
  })
  app.directive('ripple', vRipple)
}

export { StxButton, StxButtonGroup }
export { StxContainer, StxHeader, StxFooter, StxAside, StxMain }
export { StxRow, StxCol }
export { vRipple }
export * from '@stellux/hooks'

export default { install }
