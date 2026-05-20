import type { ExtractPropTypes, PropType } from 'vue'

export const menuItemProps = {
  index: {
    type: String,
    required: true as const,
  },
  disabled: Boolean,
  route: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: undefined,
  },
} as const

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export const menuItemEmits = {
  click: (_evt: { index: string; indexPath: string[] }) => true,
}

export type MenuItemEmits = typeof menuItemEmits
