import type { ExtractPropTypes, PropType } from 'vue'

export const treeSelectProps = {
  modelValue: { type: [String, Number, Array] as PropType<any>, default: undefined },
  data: { type: Array as PropType<any[]>, default: () => [] },
  multiple: Boolean,
  disabled: Boolean,
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: '' },
  clearable: Boolean,
  placeholder: { type: String, default: 'Select' },
  filterable: Boolean,
  filterMethod: { type: Function, default: undefined },
  props: {
    type: Object as PropType<{
      label?: string
      children?: string
      value?: string
      disabled?: string
    }>,
    default: () => ({ label: 'label', children: 'children', value: 'value' }),
  },
  nodeKey: { type: String, default: 'value' },
  showCheckbox: Boolean,
  checkStrictly: Boolean,
  checkOnClickNode: Boolean,
  defaultExpandAll: Boolean,
  teleported: { type: Boolean, default: true },
  popperClass: { type: String, default: '' },
  placement: { type: String as PropType<string>, default: 'bottom-start' },
  offset: { type: Number, default: 4 },
} as const

export const treeSelectEmits = {
  'update:modelValue': (val: any) => true,
  change: (val: any) => true,
  'visible-change': (visible: boolean) => true,
  clear: () => true,
}

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
export type TreeSelectEmits = typeof treeSelectEmits
