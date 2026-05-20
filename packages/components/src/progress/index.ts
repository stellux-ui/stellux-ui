import { withInstall } from '@stellux/utils'
import Progress from './progress.vue'

export const StxProgress = withInstall(Progress)
export default StxProgress

export { progressProps } from './progress'
export type { ProgressProps } from './progress'
