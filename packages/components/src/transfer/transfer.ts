import type { ExtractPropTypes, PropType } from 'vue'

export interface TransferData {
  key: string | number
  label: string
  disabled?: boolean
  [key: string]: any
}

export const transferProps = {
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<TransferData[]>,
    default: () => [],
  },
  filterable: Boolean,
  filterPlaceholder: { type: String, default: 'Enter keyword' },
  filterMethod: {
    type: Function as PropType<
      (query: string, item: TransferData) => boolean
    >,
    default: undefined,
  },
  titles: {
    type: Array as PropType<[string, string]>,
    default: () => ['Source', 'Target'],
  },
  buttonTexts: {
    type: Array as PropType<[string, string]>,
    default: () => [],
  },
  renderContent: {
    type: Function as PropType<(h: any, option: TransferData) => any>,
    default: undefined,
  },
  format: {
    type: Object as PropType<{ noChecked?: string; hasChecked?: string }>,
    default: undefined,
  },
  props: {
    type: Object as PropType<{
      key?: string
      label?: string
      disabled?: string
    }>,
    default: undefined,
  },
  targetOrder: {
    type: String as PropType<'original' | 'push' | 'unshift'>,
    default: 'original',
  },
  leftDefaultChecked: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  rightDefaultChecked: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
} as const

export const transferEmits = {
  'update:modelValue': (val: (string | number)[]) => true,
  change: (
    val: (string | number)[],
    direction: 'left' | 'right',
    movedKeys: (string | number)[]
  ) => true,
  'left-check-change': (
    checked: (string | number)[],
    movedKeys: (string | number)[]
  ) => true,
  'right-check-change': (
    checked: (string | number)[],
    movedKeys: (string | number)[]
  ) => true,
}

export type TransferProps = ExtractPropTypes<typeof transferProps>
export type TransferEmits = typeof transferEmits
