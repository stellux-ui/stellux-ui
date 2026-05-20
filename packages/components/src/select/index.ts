import { withInstall } from '@stellux/utils'
import Select from './select.vue'
import Option from './option.vue'
import OptionGroup from './option-group.vue'

export const StxSelect = withInstall(Select)
export const StxOption = withInstall(Option)
export const StxOptionGroup = withInstall(OptionGroup)
export default StxSelect

export { selectProps, selectEmits } from './select'
export { optionProps } from './option'
export { optionGroupProps } from './option-group'
export type { SelectProps, SelectEmits } from './select'
export type { OptionProps } from './option'
export type { OptionGroupProps } from './option-group'
export * from './constants'
