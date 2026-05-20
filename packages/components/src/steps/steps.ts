import type { ExtractPropTypes, PropType } from 'vue'
import type { StepStatus } from './constants'

export const stepsProps = {
  active: { type: Number, default: 0 },
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  processStatus: { type: String as PropType<StepStatus>, default: 'process' },
  finishStatus: { type: String as PropType<StepStatus>, default: 'finish' },
  alignCenter: Boolean,
  space: { type: [Number, String], default: '' },
  simple: Boolean,
} as const

export type StepsProps = ExtractPropTypes<typeof stepsProps>
