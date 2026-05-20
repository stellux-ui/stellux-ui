import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import { definePropType } from '@stellux/utils'
import type { Placement } from '@floating-ui/dom'

export const popoverProps = {
  title: { type: String, default: '' },
  width: { type: [String, Number] as PropType<string | number>, default: 150 },
  content: { type: String, default: '' },
  rawContent: Boolean,
  placement: { type: String as PropType<Placement>, default: 'bottom' as Placement },
  visible: { type: Boolean, default: undefined },
  disabled: Boolean,
  offset: { type: Number, default: 12 },
  transition: { type: String, default: 'stx-fade-in-linear' },
  showArrow: { type: Boolean, default: true },
  showAfter: { type: Number, default: 0 },
  hideAfter: { type: Number, default: 200 },
  trigger: { type: String as PropType<'hover' | 'click' | 'focus' | 'contextmenu'>, default: 'click' },
  enterable: { type: Boolean, default: true },
  popperClass: { type: String, default: '' },
  popperStyle: { type: definePropType<StyleValue>([String, Object, Array]), default: undefined },
  teleported: { type: Boolean, default: true },
  persistent: { type: Boolean, default: true },
  ariaLabel: { type: String, default: undefined },
} as const

export const popoverEmits = {
  'update:visible': (val: boolean) => typeof val === 'boolean',
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverEmits = typeof popoverEmits
