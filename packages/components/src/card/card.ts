import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import { definePropType } from '@stellux/utils'

export const cardProps = {
  header: { type: String, default: '' },
  footer: { type: String, default: '' },
  bodyStyle: { type: definePropType<StyleValue>([String, Object, Array]), default: '' },
  bodyClass: { type: [String, Array] as PropType<string | string[]>, default: '' },
  shadow: { type: String as PropType<'always' | 'hover' | 'never'>, default: 'always' },
} as const

export type CardProps = ExtractPropTypes<typeof cardProps>
