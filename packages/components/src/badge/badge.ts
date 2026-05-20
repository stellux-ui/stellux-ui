import type { ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const badgeProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  max: { type: Number, default: 99 },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'danger',
  },
  showZero: { type: Boolean, default: true },
  color: { type: String, default: '' },
  offset: {
    type: definePropType<[number, number]>(Array),
    default: undefined,
  },
} as const

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
