import type { ExtractPropTypes } from 'vue'

export const subMenuProps = {
  index: {
    type: String,
    required: true as const,
  },
  disabled: Boolean,
  popperOffset: {
    type: Number,
    default: 6,
  },
  showTimeout: {
    type: Number,
    default: 300,
  },
  hideTimeout: {
    type: Number,
    default: 300,
  },
} as const

export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>
