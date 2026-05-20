import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import { definePropType } from '@stellux/utils'
import type { Placement } from '@floating-ui/dom'

export const tooltipProps = {
  content: { type: String, default: '' },
  rawContent: Boolean,
  placement: { type: String as PropType<Placement>, default: 'bottom' as Placement },
  effect: { type: String as PropType<'dark' | 'light'>, default: 'dark' },
  visible: { type: Boolean, default: undefined },
  disabled: Boolean,
  offset: { type: Number, default: 8 },
  transition: { type: String, default: 'stx-fade-in-linear' },
  showArrow: { type: Boolean, default: true },
  showAfter: { type: Number, default: 0 },
  hideAfter: { type: Number, default: 200 },
  trigger: { type: String as PropType<'hover' | 'click' | 'focus' | 'contextmenu'>, default: 'hover' },
  enterable: { type: Boolean, default: true },
  popperClass: { type: String, default: '' },
  popperStyle: { type: definePropType<StyleValue>([String, Object, Array]), default: undefined },
  teleported: { type: Boolean, default: true },
  persistent: { type: Boolean, default: true },
  ariaLabel: { type: String, default: undefined },
} as const

export const tooltipEmits = {
  'update:visible': (val: boolean) => typeof val === 'boolean',
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipEmits = typeof tooltipEmits
