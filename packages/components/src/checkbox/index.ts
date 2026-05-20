import { withInstall } from '@stellux/utils'
import Checkbox from './checkbox.vue'
import CheckboxGroup from './checkbox-group.vue'

export const StxCheckbox = withInstall(Checkbox)
export const StxCheckboxGroup = withInstall(CheckboxGroup)
export default StxCheckbox
export { checkboxProps, checkboxEmits } from './checkbox'
export { checkboxGroupProps, checkboxGroupEmits } from './checkbox-group'
export type { CheckboxProps, CheckboxEmits } from './checkbox'
export type { CheckboxGroupProps, CheckboxGroupEmits } from './checkbox-group'
export { checkboxGroupContextKey } from './constants'
export type { CheckboxGroupContext } from './constants'
