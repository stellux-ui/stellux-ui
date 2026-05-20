import type { ExtractPropTypes, PropType } from 'vue'

export const sliderProps = {
  modelValue: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 0,
  },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  showInput: Boolean,
  showInputControls: { type: Boolean, default: true },
  inputSize: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'small',
  },
  showStops: Boolean,
  showTooltip: { type: Boolean, default: true },
  formatTooltip: {
    type: Function as PropType<(val: number) => string>,
    default: undefined,
  },
  range: Boolean,
  vertical: Boolean,
  height: { type: String, default: '' },
  disabled: Boolean,
  debounce: { type: Number, default: 300 },
  marks: {
    type: Object as PropType<
      Record<number, string | { style?: object; label: string }>
    >,
    default: undefined,
  },
  placement: { type: String as PropType<string>, default: 'top' },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
} as const

export const sliderEmits = {
  'update:modelValue': (val: number | [number, number]) => true,
  input: (val: number | [number, number]) => true,
  change: (val: number | [number, number]) => true,
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderEmits = typeof sliderEmits
