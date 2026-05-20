import type { ExtractPropTypes, PropType } from 'vue'

export const inputOtpProps = {
  modelValue: { type: String, default: '' },
  length: { type: Number, default: 6 },
  disabled: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  type: {
    type: String as PropType<'number' | 'text'>,
    default: 'number',
  },
  separator: { type: String, default: '' },
  mask: Boolean,
  formatter: {
    type: Function as PropType<(value: string) => string>,
    default: undefined,
  },
} as const

export const inputOtpEmits = {
  'update:modelValue': (val: string) => typeof val === 'string',
  change: (val: string) => typeof val === 'string',
  complete: (val: string) => typeof val === 'string',
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export type InputOtpProps = ExtractPropTypes<typeof inputOtpProps>
export type InputOtpEmits = typeof inputOtpEmits
