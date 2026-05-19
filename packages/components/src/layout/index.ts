import { withInstall } from '@stellux/utils'
import Row from './row.vue'
import Col from './col.vue'

export const StxRow = withInstall(Row)
export const StxCol = withInstall(Col)

export { rowProps } from './row'
export type { RowProps } from './row'
export { colProps } from './col'
export type { ColProps, ResponsiveConfig, ResponsiveValue } from './col'
export { rowContextKey } from './constants'
