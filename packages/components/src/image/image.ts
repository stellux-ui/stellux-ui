import type { ExtractPropTypes, PropType } from 'vue'

export const imageProps = {
  src: { type: String, default: '' },
  fit: {
    type: String as PropType<'' | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    default: '',
  },
  loading: {
    type: String as PropType<'eager' | 'lazy'>,
    default: undefined,
  },
  lazy: Boolean,
  alt: { type: String, default: '' },
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  initialIndex: { type: Number, default: 0 },
  zIndex: { type: Number, default: undefined },
  closeOnPressEscape: { type: Boolean, default: true },
  previewTeleported: { type: Boolean, default: false },
  hideOnClickModal: Boolean,
} as const

export const imageEmits = {
  load: (evt: Event) => true,
  error: (evt: Event) => true,
  switch: (index: number) => true,
  close: () => true,
  show: () => true,
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImageEmits = typeof imageEmits
