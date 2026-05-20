import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import { definePropType } from '@stellux/utils'

export const scrollbarProps = {
  height: { type: [String, Number] as PropType<string | number>, default: '' },
  maxHeight: { type: [String, Number] as PropType<string | number>, default: '' },
  native: { type: Boolean, default: false },
  wrapStyle: { type: definePropType<StyleValue>([String, Object, Array]), default: '' },
  wrapClass: { type: [String, Array] as PropType<string | string[]>, default: '' },
  viewStyle: { type: definePropType<StyleValue>([String, Object, Array]), default: '' },
  viewClass: { type: [String, Array] as PropType<string | string[]>, default: '' },
  noresize: Boolean,
  tag: { type: String, default: 'div' },
  always: Boolean,
  minSize: { type: Number, default: 20 },
} as const

export const scrollbarEmits = {
  scroll: (payload: { scrollTop: number; scrollLeft: number }) => true,
}

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
export type ScrollbarEmits = typeof scrollbarEmits
