import type { ExtractPropTypes, PropType } from 'vue'

export const timePickerProps = {
  modelValue: {
    type: [Date, String, Array] as PropType<
      Date | string | Date[] | string[]
    >,
    default: undefined,
  },
  isRange: Boolean,
  placeholder: { type: String, default: 'Select time' },
  startPlaceholder: { type: String, default: 'Start time' },
  endPlaceholder: { type: String, default: 'End time' },
  arrowControl: Boolean,
  format: { type: String, default: 'HH:mm:ss' },
  disabled: Boolean,
  clearable: { type: Boolean, default: true },
  editable: { type: Boolean, default: true },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  readonly: Boolean,
  disabledHours: {
    type: Function as PropType<() => number[]>,
    default: undefined,
  },
  disabledMinutes: {
    type: Function as PropType<(hour: number) => number[]>,
    default: undefined,
  },
  disabledSeconds: {
    type: Function as PropType<(hour: number, minute: number) => number[]>,
    default: undefined,
  },
  teleported: { type: Boolean, default: true },
  popperClass: { type: String, default: '' },
} as const

export const timePickerEmits = {
  'update:modelValue': (val: any) => true,
  change: (val: any) => true,
  'visible-change': (val: boolean) => typeof val === 'boolean',
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
export type TimePickerEmits = typeof timePickerEmits
