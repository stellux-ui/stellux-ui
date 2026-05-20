import type { ExtractPropTypes, PropType } from 'vue'

export const carouselProps = {
  initialIndex: { type: Number, default: 0 },
  height: { type: String, default: '' },
  trigger: { type: String as PropType<'hover' | 'click'>, default: 'click' },
  autoplay: { type: Boolean, default: true },
  interval: { type: Number, default: 3000 },
  indicatorPosition: { type: String as PropType<'' | 'outside' | 'none'>, default: '' },
  arrow: { type: String as PropType<'always' | 'hover' | 'never'>, default: 'hover' },
  type: { type: String as PropType<'' | 'card'>, default: '' },
  loop: { type: Boolean, default: true },
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  pauseOnHover: { type: Boolean, default: true },
} as const

export const carouselEmits = {
  change: (current: number, prev: number) => true,
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits
