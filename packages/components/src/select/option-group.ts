import type { ExtractPropTypes } from 'vue'

export const optionGroupProps = {
  label: { type: String, default: '' },
  disabled: Boolean,
} as const

export type OptionGroupProps = ExtractPropTypes<typeof optionGroupProps>
