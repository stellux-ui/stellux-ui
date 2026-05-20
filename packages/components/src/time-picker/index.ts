import { withInstall } from '@stellux/utils'
import TimePicker from './time-picker.vue'

export const StxTimePicker = withInstall(TimePicker)
export default StxTimePicker

export { timePickerProps, timePickerEmits } from './time-picker'
export type { TimePickerProps, TimePickerEmits } from './time-picker'
