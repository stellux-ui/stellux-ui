import type { ExtractPropTypes, PropType } from 'vue'

export const tableColumnProps = {
  type: { type: String as PropType<'' | 'selection' | 'index' | 'expand'>, default: '' },
  prop: { type: String, default: '' },
  label: { type: String, default: '' },
  width: { type: [String, Number] as PropType<string | number>, default: undefined },
  minWidth: { type: [String, Number] as PropType<string | number>, default: undefined },
  fixed: { type: [Boolean, String] as PropType<boolean | 'left' | 'right'>, default: false },
  sortable: { type: [Boolean, String] as PropType<boolean | 'custom'>, default: false },
  sortOrders: {
    type: Array as PropType<Array<'ascending' | 'descending' | null>>,
    default: () => ['ascending', 'descending', null],
  },
  align: { type: String as PropType<'left' | 'center' | 'right'>, default: 'left' },
  headerAlign: { type: String as PropType<'left' | 'center' | 'right'>, default: '' },
  showOverflowTooltip: Boolean,
  formatter: { type: Function as PropType<(row: any, column: any, cellValue: any, index: number) => any>, default: undefined },
  className: { type: String, default: '' },
  labelClassName: { type: String, default: '' },
} as const

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
