import type { ExtractPropTypes, PropType } from 'vue'

export const tourProps = {
  modelValue: { type: Boolean, default: undefined },
  current: { type: Number, default: 0 },
  showArrow: { type: Boolean, default: true },
  placement: { type: String as PropType<string>, default: 'bottom' },
  mask: {
    type: [Boolean, Object] as PropType<boolean | { color?: string }>,
    default: true,
  },
  type: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default',
  },
  scrollIntoViewOptions: {
    type: [Boolean, Object] as PropType<boolean | ScrollIntoViewOptions>,
    default: true,
  },
  zIndex: { type: Number, default: undefined },
  closeOnPressEscape: { type: Boolean, default: true },
} as const

export const tourEmits = {
  'update:modelValue': (val: boolean) => typeof val === 'boolean',
  'update:current': (val: number) => typeof val === 'number',
  close: (current: number) => typeof current === 'number',
  finish: () => true,
  change: (current: number) => typeof current === 'number',
}

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourEmits = typeof tourEmits
