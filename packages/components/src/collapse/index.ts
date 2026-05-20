import { withInstall } from '@stellux/utils'
import Collapse from './collapse.vue'
import CollapseItem from './collapse-item.vue'

export const StxCollapse = withInstall(Collapse)
export const StxCollapseItem = withInstall(CollapseItem)
export default StxCollapse

export { collapseProps, collapseEmits } from './collapse'
export type { CollapseProps, CollapseEmits } from './collapse'
export { collapseItemProps } from './collapse-item'
export type { CollapseItemProps } from './collapse-item'
export * from './constants'
