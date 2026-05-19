import type { Component, ExtractPropTypes, PropType } from 'vue'
import type { ButtonType, ButtonSize, ButtonNativeType } from './constants'
import { definePropType } from '@stellux/utils'

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default'
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  dashed: Boolean,
  round: Boolean,
  circle: Boolean,
  disabled: Boolean,
  loading: Boolean,
  loadingIcon: {
    type: definePropType<Component>(Object),
    default: undefined
  },
  icon: {
    type: definePropType<Component>(Object),
    default: undefined
  },
  color: {
    type: String,
    default: ''
  },
  tag: {
    type: definePropType<string | Component>([String, Object]),
    default: 'button'
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button'
  },
  autofocus: Boolean,
  ripple: {
    type: Boolean,
    default: true
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits
