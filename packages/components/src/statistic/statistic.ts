import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import { definePropType } from '@stellux/utils'

export const statisticProps = {
  value: { type: [Number, String] as PropType<number | string>, default: 0 },
  precision: { type: Number, default: 0 },
  decimalSeparator: { type: String, default: '.' },
  groupSeparator: { type: String, default: ',' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  title: { type: String, default: '' },
  valueStyle: { type: definePropType<StyleValue>([String, Object, Array]), default: '' },
} as const

export type StatisticProps = ExtractPropTypes<typeof statisticProps>
