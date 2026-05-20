import type { ExtractPropTypes, PropType } from 'vue'

export const radioProps = {
  modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },
  value: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },
  label: { type: String, default: '' },
  disabled: Boolean,
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: '' },
  border: Boolean,
  name: { type: String, default: '' },
} as const

export const radioEmits = {
  'update:modelValue': (val: string | number | boolean) => true,
  change: (val: string | number | boolean) => true,
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
