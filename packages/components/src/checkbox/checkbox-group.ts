import type { ExtractPropTypes, PropType } from 'vue'

export const checkboxGroupProps = {
  modelValue: { type: Array as PropType<any[]>, default: () => [] },
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: '' },
  disabled: Boolean,
  min: { type: Number, default: undefined },
  max: { type: Number, default: undefined },
} as const

export const checkboxGroupEmits = {
  'update:modelValue': (val: any[]) => true,
  change: (val: any[]) => true,
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
