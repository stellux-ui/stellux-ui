import { withInstall } from '@stellux/utils'
import DatePicker from './date-picker.vue'

export const StxDatePicker = withInstall(DatePicker)
export default StxDatePicker

export { datePickerProps, datePickerEmits } from './date-picker'
export type { DatePickerProps, DatePickerEmits } from './date-picker'
