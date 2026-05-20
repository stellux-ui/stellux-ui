import type { ExtractPropTypes, PropType } from 'vue'

export const textProps = {
  type: {
    type: String as PropType<'' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: ''
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  },
  tag: {
    type: String,
    default: 'span'
  },
  truncated: Boolean,
  lineClamp: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  }
} as const

export type TextProps = ExtractPropTypes<typeof textProps>
