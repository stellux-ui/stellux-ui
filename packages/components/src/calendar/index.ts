import { withInstall } from '@stellux/utils'
import Calendar from './calendar.vue'

export const StxCalendar = withInstall(Calendar)
export default StxCalendar

export { calendarProps, calendarEmits } from './calendar'
export type { CalendarProps, CalendarEmits } from './calendar'
