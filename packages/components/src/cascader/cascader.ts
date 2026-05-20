import type { ExtractPropTypes, PropType } from 'vue'

export interface CascaderOption {
  value: any
  label: string
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
}

export interface CascaderProps {
  expandTrigger?: 'click' | 'hover'
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: (
    node: any,
    resolve: (data: CascaderOption[]) => void
  ) => void
  value?: string
  label?: string
  children?: string
  disabled?: string
  leaf?: string
}

export const cascaderProps = {
  modelValue: {
    type: [Array] as PropType<any[]>,
    default: () => [],
  },
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  props: {
    type: Object as PropType<CascaderProps>,
    default: () => ({}),
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  placeholder: { type: String, default: 'Select' },
  disabled: Boolean,
  clearable: Boolean,
  showAllLevels: { type: Boolean, default: true },
  collapseTags: Boolean,
  separator: { type: String, default: ' / ' },
  filterable: Boolean,
  filterMethod: { type: Function, default: undefined },
  debounce: { type: Number, default: 300 },
  popperClass: { type: String, default: '' },
  teleported: { type: Boolean, default: true },
  tagType: { type: String as PropType<string>, default: '' },
} as const

export const cascaderEmits = {
  'update:modelValue': (val: any[]) => true,
  change: (val: any[]) => true,
  'expand-change': (val: any[]) => true,
  'visible-change': (val: boolean) => true,
  blur: (evt: FocusEvent) => true,
  focus: (evt: FocusEvent) => true,
  clear: () => true,
}

export type CascaderComponentProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderEmits = typeof cascaderEmits
