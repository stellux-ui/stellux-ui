import { withInstall } from '@stellux/utils'
import Pagination from './pagination.vue'

export const StxPagination = withInstall(Pagination)
export default StxPagination

export { paginationProps, paginationEmits } from './pagination'
export type { PaginationProps, PaginationEmits } from './pagination'
