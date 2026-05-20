import type { InjectionKey, Ref } from 'vue'

export interface TableColumnConfig {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean | 'custom'
  sortOrders?: Array<'ascending' | 'descending' | null>
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  type?: '' | 'selection' | 'index' | 'expand'
  formatter?: (row: any, column: TableColumnConfig, cellValue: any, index: number) => any
  showOverflowTooltip?: boolean
  className?: string
  labelClassName?: string
  resizable?: boolean
  renderHeader?: (data: { column: TableColumnConfig; $index: number }) => any
  slots?: { default?: any; header?: any }
}

export interface TableContext {
  registerColumn: (column: TableColumnConfig) => void
  unregisterColumn: (prop: string) => void
}

export const tableContextKey: InjectionKey<TableContext> = Symbol('tableContext')
