import type { ExtractPropTypes, PropType } from 'vue'

export const inputTagProps = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  trigger: {
    type: String as PropType<'enter' | 'space'>,
    default: 'enter',
  },
  max: { type: Number, default: undefined },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  disabled: Boolean,
  clearable: Boolean,
  placeholder: { type: String, default: '' },
  tagType: {
    type: String as PropType<
      '' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    >,
    default: 'info',
  },
  tagEffect: {
    type: String as PropType<'dark' | 'light' | 'plain'>,
    default: 'light',
  },
  validateTag: {
    type: Function as PropType<(tag: string) => boolean>,
    default: undefined,
  },
  draggable: Boolean,
} as const

export const inputTagEmits = {
  'update:modelValue': (val: string[]) => Array.isArray(val),
  change: (val: string[]) => Array.isArray(val),
  'tag-add': (tag: string) => typeof tag === 'string',
  'tag-remove': (tag: string) => typeof tag === 'string',
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export type InputTagProps = ExtractPropTypes<typeof inputTagProps>
export type InputTagEmits = typeof inputTagEmits
