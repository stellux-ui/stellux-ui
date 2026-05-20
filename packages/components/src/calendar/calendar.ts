import type { ExtractPropTypes, PropType } from 'vue'

export const calendarProps = {
  modelValue: { type: Date, default: undefined },
  range: { type: Array as PropType<[Date, Date]>, default: undefined },
} as const

export const calendarEmits = {
  'update:modelValue': (val: Date) => true,
  input: (val: Date) => true,
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarEmits = typeof calendarEmits
