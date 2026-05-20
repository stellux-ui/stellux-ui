import { withInstall } from '@stellux/utils'
import InputOtp from './input-otp.vue'

export const StxInputOtp = withInstall(InputOtp)
export default StxInputOtp

export { inputOtpProps, inputOtpEmits } from './input-otp'
export type { InputOtpProps, InputOtpEmits } from './input-otp'
