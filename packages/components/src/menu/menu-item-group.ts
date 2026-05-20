import type { ExtractPropTypes } from 'vue'

export const menuItemGroupProps = {
  title: {
    type: String,
    default: '',
  },
} as const

export type MenuItemGroupProps = ExtractPropTypes<typeof menuItemGroupProps>
