import type { ExtractPropTypes, PropType } from 'vue'

export const datePickerProps = {
  modelValue: {
    type: [Date, String, Number, Array] as PropType<
      Date | string | number | Date[] | string[]
    >,
    default: undefined,
  },
  type: {
    type: String as PropType<
      | 'year'
      | 'month'
      | 'date'
      | 'dates'
      | 'week'
      | 'datetime'
      | 'daterange'
      | 'monthrange'
      | 'datetimerange'
    >,
    default: 'date',
  },
  format: { type: String, default: '' },
  valueFormat: { type: String, default: '' },
  placeholder: { type: String, default: 'Select date' },
  startPlaceholder: { type: String, default: 'Start date' },
  endPlaceholder: { type: String, default: 'End date' },
  rangeSeparator: { type: String, default: '-' },
  defaultValue: {
    type: [Date, Array] as PropType<Date | Date[]>,
    default: undefined,
  },
  disabled: Boolean,
  clearable: { type: Boolean, default: true },
  editable: { type: Boolean, default: true },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  readonly: Boolean,
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: undefined,
  },
  shortcuts: {
    type: Array as PropType<
      Array<{ text: string; value: Date | (() => Date | Date[]) }>
    >,
    default: undefined,
  },
  teleported: { type: Boolean, default: true },
  popperClass: { type: String, default: '' },
} as const

export const datePickerEmits = {
  'update:modelValue': (val: any) => true,
  change: (val: any) => true,
  'visible-change': (val: boolean) => typeof val === 'boolean',
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  'calendar-change': (val: [Date, Date | null]) => true,
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerEmits = typeof datePickerEmits
