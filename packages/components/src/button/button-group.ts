import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonType, ButtonSize, ButtonDirection } from './constants'

export const buttonGroupProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: undefined
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: undefined
  },
  direction: {
    type: String as PropType<ButtonDirection>,
    default: 'horizontal'
  }
} as const

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>
