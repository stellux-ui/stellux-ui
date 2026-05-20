import type { Component, ExtractPropTypes, PropType } from 'vue'

export interface SegmentedOption {
  label: string
  value: string | number
  disabled?: boolean
  icon?: Component
}

export const segmentedProps = {
  modelValue: { type: [String, Number] as PropType<string | number>, default: undefined },
  options: { type: Array as PropType<(string | number | SegmentedOption)[]>, default: () => [] },
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
  disabled: Boolean,
  block: Boolean,
} as const

export const segmentedEmits = {
  'update:modelValue': (val: string | number) => typeof val === 'string' || typeof val === 'number',
  change: (val: string | number) => typeof val === 'string' || typeof val === 'number',
}

export type SegmentedProps = ExtractPropTypes<typeof segmentedProps>
export type SegmentedEmits = typeof segmentedEmits
