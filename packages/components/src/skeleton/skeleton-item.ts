import type { ExtractPropTypes, PropType } from 'vue'

export const skeletonItemProps = {
  variant: {
    type: String as PropType<'text' | 'circle' | 'rect' | 'image' | 'button' | 'p' | 'h1' | 'h3' | 'caption'>,
    default: 'text',
  },
} as const

export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>
