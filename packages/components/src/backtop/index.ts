import { withInstall } from '@stellux/utils'
import Backtop from './backtop.vue'

export const StxBacktop = withInstall(Backtop)
export default StxBacktop

export { backtopProps, backtopEmits } from './backtop'
export type { BacktopProps, BacktopEmits } from './backtop'
