import type { ExtractPropTypes, PropType } from 'vue'

export const resultProps = {
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  icon: {
    type: String as PropType<'success' | 'warning' | 'info' | 'error'>,
    default: 'info',
  },
} as const

export type ResultProps = ExtractPropTypes<typeof resultProps>
