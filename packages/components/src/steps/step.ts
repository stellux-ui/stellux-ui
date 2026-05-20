import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'
import type { StepStatus } from './constants'

export const stepProps = {
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: definePropType<Component>(Object), default: undefined },
  status: { type: String as PropType<StepStatus>, default: '' },
} as const

export type StepProps = ExtractPropTypes<typeof stepProps>
