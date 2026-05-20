import type { ExtractPropTypes, PropType } from 'vue'

export const tourStepProps = {
  target: {
    type: [String, Object, Function] as PropType<
      string | HTMLElement | (() => HTMLElement | null)
    >,
    default: undefined,
  },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  placement: { type: String as PropType<string>, default: undefined },
  showArrow: { type: Boolean, default: undefined },
  mask: { type: [Boolean, Object], default: undefined },
  type: {
    type: String as PropType<'default' | 'primary'>,
    default: undefined,
  },
  nextButtonProps: { type: Object, default: undefined },
  prevButtonProps: { type: Object, default: undefined },
} as const

export type TourStepProps = ExtractPropTypes<typeof tourStepProps>
