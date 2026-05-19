import type { Component, ExtractPropTypes, PropType, StyleValue } from 'vue'
import { definePropType } from '@stellux/utils'

export type InputAutoSize = boolean | { minRows?: number; maxRows?: number }

export const inputProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  showWordLimit: Boolean,
  maxlength: [String, Number] as PropType<string | number>,
  minlength: [String, Number] as PropType<string | number>,
  prefixIcon: {
    type: definePropType<Component>(Object),
    default: undefined,
  },
  suffixIcon: {
    type: definePropType<Component>(Object),
    default: undefined,
  },
  rows: {
    type: Number,
    default: 2,
  },
  autosize: {
    type: [Boolean, Object] as PropType<InputAutoSize>,
    default: false,
  },
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  autofocus: Boolean,
  tabindex: [String, Number] as PropType<string | number>,
  inputStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: undefined,
  },
  id: String,
  name: String,
  form: String,
  ariaLabel: String,
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string | number) => true,
  input: (value: string | number) => true,
  change: (value: string | number) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent | Event) => true,
}

export type InputEmits = typeof inputEmits
