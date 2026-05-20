import { withInstall } from '@stellux/utils'
import Radio from './radio.vue'
import RadioGroup from './radio-group.vue'

export const StxRadio = withInstall(Radio)
export const StxRadioGroup = withInstall(RadioGroup)
export default StxRadio
export { radioProps, radioEmits } from './radio'
export { radioGroupProps, radioGroupEmits } from './radio-group'
export type { RadioProps, RadioEmits } from './radio'
export type { RadioGroupProps, RadioGroupEmits } from './radio-group'
export { radioGroupContextKey } from './constants'
export type { RadioGroupContext } from './constants'
