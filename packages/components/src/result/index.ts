import { withInstall } from '@stellux/utils'
import Result from './result.vue'

export const StxResult = withInstall(Result)
export default StxResult

export { resultProps } from './result'
export type { ResultProps } from './result'
