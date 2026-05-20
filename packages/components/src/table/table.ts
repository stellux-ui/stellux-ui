import type { ExtractPropTypes, PropType } from 'vue'
import type { TableColumnConfig } from './constants'

export const tableProps = {
  data: { type: Array as PropType<any[]>, default: () => [] },
  height: { type: [String, Number] as PropType<string | number>, default: undefined },
  maxHeight: { type: [String, Number] as PropType<string | number>, default: undefined },
  stripe: Boolean,
  border: Boolean,
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
  fit: { type: Boolean, default: true },
  showHeader: { type: Boolean, default: true },
  highlightCurrentRow: Boolean,
  currentRowKey: { type: [String, Number] as PropType<string | number>, default: undefined },
  rowClassName: {
    type: [String, Function] as PropType<
      string | ((data: { row: any; rowIndex: number }) => string)
    >,
    default: '',
  },
  rowStyle: {
    type: [Object, Function] as PropType<
      object | ((data: { row: any; rowIndex: number }) => object)
    >,
    default: undefined,
  },
  cellClassName: {
    type: [String, Function] as PropType<
      string | ((data: { row: any; column: TableColumnConfig; rowIndex: number; columnIndex: number }) => string)
    >,
    default: '',
  },
  cellStyle: {
    type: [Object, Function] as PropType<
      object | ((data: { row: any; column: TableColumnConfig; rowIndex: number; columnIndex: number }) => object)
    >,
    default: undefined,
  },
  headerRowClassName: {
    type: [String, Function] as PropType<string | ((data: { rowIndex: number }) => string)>,
    default: '',
  },
  headerCellClassName: {
    type: [String, Function] as PropType<
      string | ((data: { column: TableColumnConfig; columnIndex: number }) => string)
    >,
    default: '',
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => string)>,
    default: '',
  },
  emptyText: { type: String, default: 'No Data' },
  defaultExpandAll: Boolean,
  defaultSort: {
    type: Object as PropType<{ prop: string; order: 'ascending' | 'descending' }>,
    default: undefined,
  },
  tooltipEffect: { type: String as PropType<'dark' | 'light'>, default: 'dark' },
  showSummary: Boolean,
  sumText: { type: String, default: 'Sum' },
  summaryMethod: {
    type: Function as PropType<
      (data: { columns: TableColumnConfig[]; data: any[] }) => any[]
    >,
    default: undefined,
  },
  spanMethod: {
    type: Function as PropType<
      (data: {
        row: any
        column: TableColumnConfig
        rowIndex: number
        columnIndex: number
      }) => number[] | { rowspan: number; colspan: number } | undefined
    >,
    default: undefined,
  },
  selectOnIndeterminate: { type: Boolean, default: true },
  indent: { type: Number, default: 16 },
  treeProps: {
    type: Object as PropType<{ hasChildren?: string; children?: string }>,
    default: () => ({ hasChildren: 'hasChildren', children: 'children' }),
  },
} as const

export const tableEmits = {
  select: (selection: any[], row: any) => true,
  'select-all': (selection: any[]) => true,
  'selection-change': (selection: any[]) => true,
  'cell-click': (row: any, column: TableColumnConfig, cell: any, event: Event) => true,
  'row-click': (row: any, column: TableColumnConfig, event: Event) => true,
  'header-click': (column: TableColumnConfig, event: Event) => true,
  'sort-change': (data: { column: TableColumnConfig; prop: string; order: string | null }) => true,
  'current-change': (currentRow: any, oldCurrentRow: any) => true,
  'expand-change': (row: any, expandedRows: any[]) => true,
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits
