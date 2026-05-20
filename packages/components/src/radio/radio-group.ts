import type { ExtractPropTypes, PropType } from 'vue'

export const radioGroupProps = {
  modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: '' },
  disabled: Boolean,
  textColor: { type: String, default: '' },
  fill: { type: String, default: '' },
} as const

export const radioGroupEmits = {
  'update:modelValue': (val: string | number | boolean) => true,
  change: (val: string | number | boolean) => true,
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits
