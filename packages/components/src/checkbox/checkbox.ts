import type { ExtractPropTypes, PropType } from 'vue'

export const checkboxProps = {
  modelValue: { type: [Boolean, String, Number, Array] as PropType<boolean | string | number | any[]>, default: undefined },
  value: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },
  label: { type: String, default: '' },
  disabled: Boolean,
  checked: Boolean,
  indeterminate: Boolean,
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: '' },
  border: Boolean,
  trueValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: true },
  falseValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: false },
  name: { type: String, default: '' },
} as const

export const checkboxEmits = {
  'update:modelValue': (val: any) => true,
  change: (val: any) => true,
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits
