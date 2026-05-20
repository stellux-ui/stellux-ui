import { withInstall } from '@stellux/utils'
import Rate from './rate.vue'

export const StxRate = withInstall(Rate)
export default StxRate

export { rateProps, rateEmits } from './rate'
export type { RateProps, RateEmits } from './rate'
