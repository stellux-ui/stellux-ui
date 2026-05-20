import type { ExtractPropTypes, StyleValue } from 'vue'
import { definePropType } from '@stellux/utils'

export const countdownProps = {
  value: { type: Number, default: 0 },
  format: { type: String, default: 'HH:mm:ss' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  title: { type: String, default: '' },
  valueStyle: { type: definePropType<StyleValue>([String, Object, Array]), default: '' },
} as const

export const countdownEmits = {
  change: (value: number) => typeof value === 'number',
  finish: () => true,
}

export type CountdownProps = ExtractPropTypes<typeof countdownProps>
export type CountdownEmits = typeof countdownEmits
