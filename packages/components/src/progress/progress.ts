import type { ExtractPropTypes, PropType } from 'vue'

export const progressProps = {
  percentage: { type: Number, default: 0 },
  type: {
    type: String as PropType<'line' | 'circle' | 'dashboard'>,
    default: 'line',
  },
  strokeWidth: { type: Number, default: 6 },
  textInside: Boolean,
  status: {
    type: String as PropType<'' | 'success' | 'warning' | 'exception'>,
    default: '',
  },
  color: {
    type: [String, Array, Function] as PropType<
      | string
      | Array<{ color: string; percentage: number }>
      | ((percentage: number) => string)
    >,
    default: '',
  },
  width: { type: Number, default: 126 },
  showText: { type: Boolean, default: true },
  format: {
    type: Function as PropType<(percentage: number) => string>,
    default: undefined,
  },
  indeterminate: Boolean,
  duration: { type: Number, default: 3 },
  striped: Boolean,
  stripedFlow: Boolean,
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps>
