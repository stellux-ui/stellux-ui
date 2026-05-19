import type { ExtractPropTypes, PropType } from 'vue'

export interface ResponsiveConfig {
  span?: number
  offset?: number
}

export type ResponsiveValue = number | ResponsiveConfig

export const colProps = {
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  tag: {
    type: String,
    default: 'div'
  },
  xs: {
    type: [Number, Object] as PropType<ResponsiveValue>,
    default: undefined
  },
  sm: {
    type: [Number, Object] as PropType<ResponsiveValue>,
    default: undefined
  },
  md: {
    type: [Number, Object] as PropType<ResponsiveValue>,
    default: undefined
  },
  lg: {
    type: [Number, Object] as PropType<ResponsiveValue>,
    default: undefined
  },
  xl: {
    type: [Number, Object] as PropType<ResponsiveValue>,
    default: undefined
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>
