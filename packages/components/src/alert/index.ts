import { withInstall } from '@stellux/utils'
import Alert from './alert.vue'

export const StxAlert = withInstall(Alert)
export default StxAlert

export { alertProps, alertEmits } from './alert'
export type { AlertProps, AlertEmits } from './alert'
