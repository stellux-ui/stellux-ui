import type { ExtractPropTypes, PropType } from 'vue'

export const carouselItemProps = {
  name: { type: String, default: '' },
  label: { type: [String, Number] as PropType<string | number>, default: '' },
} as const

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>
