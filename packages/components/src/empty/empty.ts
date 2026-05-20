import type { ExtractPropTypes, PropType } from 'vue'

export const emptyProps = {
  image: { type: String, default: '' },
  imageSize: { type: Number, default: 160 },
  description: { type: String, default: 'No Data' },
} as const

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
