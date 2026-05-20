import type { ExtractPropTypes, PropType } from 'vue'

export interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
}

export const mentionProps = {
  modelValue: { type: String, default: '' },
  options: {
    type: Array as PropType<MentionOption[]>,
    default: () => [],
  },
  prefix: {
    type: [String, Array] as PropType<string | string[]>,
    default: '@',
  },
  split: { type: String, default: ' ' },
  filterOption: {
    type: [Boolean, Function] as PropType<
      boolean | ((pattern: string, option: MentionOption) => boolean)
    >,
    default: undefined,
  },
  placement: { type: String as PropType<string>, default: 'bottom' },
  showArrow: Boolean,
  offset: { type: Number, default: 4 },
  whole: Boolean,
  checkIsWhole: {
    type: Function as PropType<(pattern: string, prefix: string) => boolean>,
    default: undefined,
  },
  loading: Boolean,
  disabled: Boolean,
  rows: { type: Number, default: 3 },
  placeholder: { type: String, default: '' },
} as const

export const mentionEmits = {
  'update:modelValue': (val: string) => typeof val === 'string',
  search: (pattern: string, prefix: string) => true,
  select: (option: MentionOption, prefix: string) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export type MentionProps = ExtractPropTypes<typeof mentionProps>
export type MentionEmits = typeof mentionEmits
