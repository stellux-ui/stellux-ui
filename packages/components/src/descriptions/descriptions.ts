import type { ExtractPropTypes, PropType } from 'vue'

export const descriptionsProps = {
  border: Boolean,
  column: { type: Number, default: 3 },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  title: { type: String, default: '' },
  extra: { type: String, default: '' },
} as const

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>
