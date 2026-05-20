import { withInstall } from '@stellux/utils'
import Popover from './popover.vue'

export const StxPopover = withInstall(Popover)
export default StxPopover

export { popoverProps, popoverEmits } from './popover'
export type { PopoverProps, PopoverEmits } from './popover'
