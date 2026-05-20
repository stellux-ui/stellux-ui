import { withInstall } from '@stellux/utils'
import Tree from './tree.vue'

export const StxTree = withInstall(Tree)
export default StxTree

export { treeProps, treeEmits } from './tree'
export type { TreeProps, TreeEmits, TreeNode } from './tree'
