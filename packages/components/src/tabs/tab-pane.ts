import type { ExtractPropTypes, PropType } from 'vue'

export const tabPaneProps = {
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true as const,
  },
  label: { type: String, default: '' },
  disabled: Boolean,
  closable: Boolean,
  lazy: Boolean,
} as const

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>
