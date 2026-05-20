import type { ExtractPropTypes, PropType } from 'vue'

export const inputNumberProps = {
  modelValue: {
    type: Number,
    default: undefined,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
  stepStrictly: Boolean,
  precision: {
    type: Number,
    default: undefined,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  controlsPosition: {
    type: String as PropType<'' | 'right'>,
    default: '',
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  disabled: Boolean,
  placeholder: {
    type: String,
    default: '',
  },
  readonly: Boolean,
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  valueOnClear: {
    type: [Number, null] as PropType<number | null>,
    default: null,
  },
} as const

export const inputNumberEmits = {
  'update:modelValue': (val: number | undefined) => true,
  change: (cur: number | undefined, prev: number | undefined) => true,
  blur: (evt: FocusEvent) => true,
  focus: (evt: FocusEvent) => true,
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
export type InputNumberEmits = typeof inputNumberEmits
