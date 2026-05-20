import type { ExtractPropTypes, PropType } from 'vue'

export const colorPickerProps = {
  modelValue: { type: String, default: '' },
  disabled: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  showAlpha: Boolean,
  colorFormat: {
    type: String as PropType<'hex' | 'rgb' | 'hsl' | 'hsv'>,
    default: undefined,
  },
  predefine: {
    type: Array as PropType<string[]>,
    default: undefined,
  },
  teleported: { type: Boolean, default: true },
} as const

export const colorPickerEmits = {
  'update:modelValue': (val: string) => typeof val === 'string',
  change: (val: string) => typeof val === 'string',
  activeChange: (val: string) => typeof val === 'string',
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
