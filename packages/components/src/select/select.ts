import type { ExtractPropTypes, PropType } from 'vue'

export const selectProps = {
  modelValue: {
    type: [String, Number, Boolean, Array, Object] as PropType<any>,
    default: undefined,
  },
  multiple: Boolean,
  disabled: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  loading: Boolean,
  loadingText: { type: String, default: 'Loading...' },
  noDataText: { type: String, default: 'No data' },
  noMatchText: { type: String, default: 'No matching data' },
  placeholder: { type: String, default: 'Select' },
  multipleLimit: { type: Number, default: 0 },
  collapseTags: Boolean,
  collapseTagsTooltip: Boolean,
  maxCollapseTags: { type: Number, default: 1 },
  teleported: { type: Boolean, default: true },
  persistent: { type: Boolean, default: true },
  popperClass: { type: String, default: '' },
  effect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'light',
  },
  placement: {
    type: String as PropType<string>,
    default: 'bottom-start',
  },
  offset: { type: Number, default: 4 },
} as const

export const selectEmits = {
  'update:modelValue': (val: any) => true,
  change: (val: any) => true,
  'visible-change': (visible: boolean) => true,
  'remove-tag': (val: any) => true,
  clear: () => true,
  blur: (evt: FocusEvent) => true,
  focus: (evt: FocusEvent) => true,
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectEmits = typeof selectEmits
