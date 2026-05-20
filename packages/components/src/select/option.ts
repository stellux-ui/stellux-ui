import type { ExtractPropTypes, PropType } from 'vue'

export const optionProps = {
  value: {
    type: [String, Number, Boolean, Object] as PropType<any>,
    required: true as const,
  },
  label: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  disabled: Boolean,
} as const

export type OptionProps = ExtractPropTypes<typeof optionProps>
