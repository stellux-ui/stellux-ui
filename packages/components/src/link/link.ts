import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const linkProps = {
  type: {
    type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'default'
  },
  underline: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: '_self'
  },
  icon: {
    type: definePropType<Component>(Object),
    default: undefined
  }
} as const

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type LinkProps = ExtractPropTypes<typeof linkProps>
export type LinkEmits = typeof linkEmits
