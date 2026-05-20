import { withInstall } from '@stellux/utils'
import Tooltip from './tooltip.vue'

export const StxTooltip = withInstall(Tooltip)
export default StxTooltip

export { tooltipProps, tooltipEmits } from './tooltip'
export type { TooltipProps, TooltipEmits } from './tooltip'
