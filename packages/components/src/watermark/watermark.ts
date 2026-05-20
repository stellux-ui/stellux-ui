import type { ExtractPropTypes, PropType } from 'vue'

export interface WatermarkFont {
  color?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  fontStyle?: string
}

export const watermarkProps = {
  width: { type: Number, default: 120 },
  height: { type: Number, default: 64 },
  rotate: { type: Number, default: -22 },
  zIndex: { type: Number, default: 9 },
  image: { type: String, default: '' },
  content: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  font: {
    type: Object as PropType<WatermarkFont>,
    default: () => ({}),
  },
  gap: {
    type: Array as PropType<[number, number]>,
    default: () => [100, 100],
  },
  offset: {
    type: Array as PropType<[number, number]>,
    default: undefined,
  },
} as const

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
