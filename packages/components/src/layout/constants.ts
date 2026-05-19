import type { InjectionKey } from 'vue'

export interface RowContext {
  gutter: number
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContext')
