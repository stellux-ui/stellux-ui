import { withInstall } from '@stellux/utils'
import Statistic from './statistic.vue'
import Countdown from './countdown.vue'

export const StxStatistic = withInstall(Statistic)
export const StxCountdown = withInstall(Countdown)
export default StxStatistic

export { statisticProps } from './statistic'
export type { StatisticProps } from './statistic'
export { countdownProps, countdownEmits } from './countdown'
export type { CountdownProps, CountdownEmits } from './countdown'
