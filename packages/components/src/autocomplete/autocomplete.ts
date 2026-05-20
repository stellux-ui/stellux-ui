import type { ExtractPropTypes, PropType } from 'vue'

export const autocompleteProps = {
  modelValue: { type: String, default: '' },
  fetchSuggestions: {
    type: Function as PropType<
      (
        query: string,
        cb: (suggestions: any[]) => void,
      ) => void | Promise<any[]>
    >,
    default: undefined,
  },
  placeholder: { type: String, default: '' },
  disabled: Boolean,
  valueKey: { type: String, default: 'value' },
  debounce: { type: Number, default: 300 },
  placement: { type: String as PropType<string>, default: 'bottom-start' },
  triggerOnFocus: { type: Boolean, default: true },
  selectWhenUnmatched: Boolean,
  hideLoading: Boolean,
  highlightFirstItem: { type: Boolean, default: false },
  fitInputWidth: { type: Boolean, default: true },
  clearable: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
} as const

export const autocompleteEmits = {
  'update:modelValue': (val: string) => typeof val === 'string',
  input: (val: string) => typeof val === 'string',
  change: (val: string) => typeof val === 'string',
  select: (item: any) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}

export type AutocompleteProps = ExtractPropTypes<typeof autocompleteProps>
export type AutocompleteEmits = typeof autocompleteEmits
