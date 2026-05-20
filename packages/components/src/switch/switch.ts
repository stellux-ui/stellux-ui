import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false,
  },
  disabled: Boolean,
  loading: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: '',
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  activeText: {
    type: String,
    default: '',
  },
  inactiveText: {
    type: String,
    default: '',
  },
  activeValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false,
  },
  activeColor: {
    type: String,
    default: '',
  },
  inactiveColor: {
    type: String,
    default: '',
  },
  activeIcon: {
    type: definePropType<Component>(Object),
    default: undefined,
  },
  inactiveIcon: {
    type: definePropType<Component>(Object),
    default: undefined,
  },
  inlinePrompt: Boolean,
  beforeChange: {
    type: definePropType<() => Promise<boolean> | boolean>(Function),
    default: undefined,
  },
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  tabindex: {
    type: [String, Number] as PropType<string | number>,
    default: 0,
  },
} as const

export const switchEmits = {
  'update:modelValue': (val: boolean | string | number) => true,
  change: (val: boolean | string | number) => true,
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits
