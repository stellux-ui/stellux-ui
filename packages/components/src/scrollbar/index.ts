import { withInstall } from '@stellux/utils'
import Scrollbar from './scrollbar.vue'

export const StxScrollbar = withInstall(Scrollbar)
export default StxScrollbar

export { scrollbarProps, scrollbarEmits } from './scrollbar'
export type { ScrollbarProps, ScrollbarEmits } from './scrollbar'
export * from './constants'
