import type { ExtractPropTypes, PropType } from 'vue'

export const paginationProps = {
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 10 },
  currentPage: { type: Number, default: 1 },
  pageCount: { type: Number, default: undefined },
  pagerCount: { type: Number, default: 7 },
  layout: { type: String, default: 'prev, pager, next' },
  pageSizes: { type: Array as PropType<number[]>, default: () => [10, 20, 30, 50, 100] },
  small: Boolean,
  background: Boolean,
  disabled: Boolean,
  hideOnSinglePage: Boolean,
} as const

export const paginationEmits = {
  'update:currentPage': (val: number) => true,
  'update:pageSize': (val: number) => true,
  'current-change': (val: number) => true,
  'size-change': (val: number) => true,
  'prev-click': (val: number) => true,
  'next-click': (val: number) => true,
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationEmits = typeof paginationEmits
