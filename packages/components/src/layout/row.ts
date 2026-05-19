import type { ExtractPropTypes, PropType } from 'vue'

export const rowProps = {
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String as PropType<'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'>,
    default: 'start'
  },
  align: {
    type: String as PropType<'top' | 'middle' | 'bottom'>,
    default: undefined
  },
  tag: {
    type: String,
    default: 'div'
  }
} as const

export type RowProps = ExtractPropTypes<typeof rowProps>
