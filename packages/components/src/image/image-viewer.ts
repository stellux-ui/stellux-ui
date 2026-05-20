import type { ExtractPropTypes, PropType } from 'vue'

export const imageViewerProps = {
  urlList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  initialIndex: { type: Number, default: 0 },
  zIndex: { type: Number, default: undefined },
  closeOnPressEscape: { type: Boolean, default: true },
  hideOnClickModal: Boolean,
  infinite: { type: Boolean, default: true },
} as const

export const imageViewerEmits = {
  close: () => true,
  switch: (index: number) => true,
}

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>
export type ImageViewerEmits = typeof imageViewerEmits
