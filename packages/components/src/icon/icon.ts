import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const iconProps = {
  size: {
    type: [Number, String] as PropType<number | string>,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  component: {
    type: definePropType<Component>(Object),
    default: undefined
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
