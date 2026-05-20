import { withInstall } from '@stellux/utils'
import Table from './table.vue'
import TableColumn from './table-column.vue'

export const StxTable = withInstall(Table)
export const StxTableColumn = withInstall(TableColumn)
export default StxTable

export { tableProps, tableEmits } from './table'
export { tableColumnProps } from './table-column'
export type { TableProps, TableEmits } from './table'
export type { TableColumnProps } from './table-column'
export { tableContextKey } from './constants'
export type { TableColumnConfig, TableContext } from './constants'
