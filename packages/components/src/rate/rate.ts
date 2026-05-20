import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const rateProps = {
  modelValue: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  disabled: Boolean,
  allowHalf: Boolean,
  lowThreshold: { type: Number, default: 2 },
  highThreshold: { type: Number, default: 4 },
  colors: {
    type: [Array, Object] as PropType<string[] | Record<number, string>>,
    default: () => ['#f7ba2a', '#f7ba2a', '#f7ba2a'],
  },
  voidColor: { type: String, default: '#c6d1de' },
  disabledVoidColor: { type: String, default: '#eff2f7' },
  icons: {
    type: [Array, Object] as PropType<any>,
    default: undefined,
  },
  voidIcon: {
    type: definePropType<Component>(Object),
    default: undefined,
  },
  showText: Boolean,
  showScore: Boolean,
  textColor: { type: String, default: '' },
  texts: {
    type: Array as PropType<string[]>,
    default: () => ['Terrible', 'Bad', 'Normal', 'Good', 'Great'],
  },
  scoreTemplate: { type: String, default: '{value}' },
  clearable: Boolean,
  id: { type: String, default: '' },
} as const

export const rateEmits = {
  'update:modelValue': (val: number) => typeof val === 'number',
  change: (val: number) => typeof val === 'number',
}

export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateEmits = typeof rateEmits
