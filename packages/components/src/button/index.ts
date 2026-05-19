import { withInstall } from '@stellux/utils'
import Button from './button.vue'
import ButtonGroup from './button-group.vue'

export const StxButton = withInstall(Button)
export const StxButtonGroup = withInstall(ButtonGroup)
export default StxButton

export { buttonProps, buttonEmits } from './button'
export type { ButtonProps, ButtonEmits } from './button'
export { buttonGroupProps } from './button-group'
export type { ButtonGroupProps } from './button-group'
export * from './constants'
export type { ButtonInstance } from './instance'
