import type { ExtractPropTypes, PropType } from 'vue'

export const descriptionsItemProps = {
  label: { type: String, default: '' },
  span: { type: Number, default: 1 },
  width: { type: [String, Number], default: '' },
  minWidth: { type: [String, Number], default: '' },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  },
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: '',
  },
  labelWidth: { type: [String, Number], default: '' },
  className: { type: String, default: '' },
  labelClassName: { type: String, default: '' },
} as const

export type DescriptionsItemProps = ExtractPropTypes<
  typeof descriptionsItemProps
>
