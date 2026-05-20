import { withInstall } from '@stellux/utils'
import InputNumber from './input-number.vue'

export const StxInputNumber = withInstall(InputNumber)
export default StxInputNumber

export { inputNumberProps, inputNumberEmits } from './input-number'
export type { InputNumberProps, InputNumberEmits } from './input-number'
