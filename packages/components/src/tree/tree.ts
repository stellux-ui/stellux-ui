import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export interface TreeNode {
  key: string | number
  label: string
  children: TreeNode[]
  disabled: boolean
  isLeaf: boolean
  data: any
  level: number
  expanded: boolean
  checked: boolean
  indeterminate: boolean
  parent?: TreeNode
  visible: boolean
  loaded: boolean
  loading: boolean
}

export const treeProps = {
  data: { type: Array as PropType<any[]>, default: () => [] },
  emptyText: { type: String, default: 'No data' },
  nodeKey: { type: String, default: '' },
  props: {
    type: Object as PropType<{
      label?: string
      children?: string
      disabled?: string
      isLeaf?: string
    }>,
    default: () => ({ label: 'label', children: 'children' }),
  },
  load: {
    type: Function as PropType<(node: TreeNode, resolve: (data: any[]) => void) => void>,
    default: undefined,
  },
  lazy: Boolean,
  highlightCurrent: Boolean,
  defaultExpandAll: Boolean,
  expandOnClickNode: { type: Boolean, default: true },
  checkOnClickNode: Boolean,
  autoExpandParent: { type: Boolean, default: true },
  defaultExpandedKeys: { type: Array as PropType<(string | number)[]>, default: () => [] },
  showCheckbox: Boolean,
  checkStrictly: Boolean,
  defaultCheckedKeys: { type: Array as PropType<(string | number)[]>, default: () => [] },
  currentNodeKey: { type: [String, Number] as PropType<string | number>, default: undefined },
  filterNodeMethod: {
    type: Function as PropType<(value: string, data: any, node: TreeNode) => boolean>,
    default: undefined,
  },
  accordion: Boolean,
  indent: { type: Number, default: 18 },
  icon: { type: definePropType<Component>(Object), default: undefined },
} as const

export const treeEmits = {
  'node-click': (data: any, node: TreeNode, e: MouseEvent) => true,
  'node-expand': (data: any, node: TreeNode) => true,
  'node-collapse': (data: any, node: TreeNode) => true,
  'check-change': (data: any, checked: boolean, indeterminate: boolean) => true,
  check: (data: any, checkedInfo: { checkedNodes: any[]; checkedKeys: (string | number)[] }) => true,
  'current-change': (data: any, node: TreeNode) => true,
}

export type TreeProps = ExtractPropTypes<typeof treeProps>
export type TreeEmits = typeof treeEmits
