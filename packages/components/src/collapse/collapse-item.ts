import type { ExtractPropTypes, PropType } from 'vue'

export const collapseItemProps = {
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  title: { type: String, default: '' },
  disabled: Boolean,
} as const

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
