import { withInstall } from '@stellux/utils'
import Input from './input.vue'

export const StxInput = withInstall(Input)
export default StxInput

export { inputProps, inputEmits } from './input'
export type { InputProps, InputEmits, InputAutoSize } from './input'
