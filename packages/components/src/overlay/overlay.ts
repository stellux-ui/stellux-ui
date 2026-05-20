import type { ExtractPropTypes } from 'vue'

export const overlayProps = {
  mask: { type: Boolean, default: true },
  customMaskEvent: Boolean,
  zIndex: { type: Number, default: undefined },
} as const

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayEmits = typeof overlayEmits
