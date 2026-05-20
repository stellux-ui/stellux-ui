import type { ExtractPropTypes, PropType, VNode } from 'vue'
import { definePropType } from '@stellux/utils'

export const spaceProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  size: {
    type: [String, Number, Array] as PropType<'small' | 'default' | 'large' | number | [number, number]>,
    default: 'default'
  },
  wrap: Boolean,
  fill: Boolean,
  fillRatio: {
    type: Number,
    default: 100
  },
  alignment: {
    type: String as PropType<string>,
    default: 'center'
  },
  spacer: {
    type: definePropType<VNode | string>([Object, String]),
    default: undefined
  }
} as const

export type SpaceProps = ExtractPropTypes<typeof spaceProps>
