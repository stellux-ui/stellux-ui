import { withInstall } from '@stellux/utils'
import TreeSelect from './tree-select.vue'

export const StxTreeSelect = withInstall(TreeSelect)
export default StxTreeSelect

export { treeSelectProps, treeSelectEmits } from './tree-select'
export type { TreeSelectProps, TreeSelectEmits } from './tree-select'
