import type { ExtractPropTypes, PropType } from 'vue'
import type { RuleItem } from 'async-validator'

export const formItemProps = {
  prop: { type: String, default: '' },
  label: { type: String, default: '' },
  labelWidth: { type: [String, Number] as PropType<string | number>, default: '' },
  required: { type: Boolean, default: undefined },
  rules: { type: [Object, Array] as PropType<RuleItem | RuleItem[]>, default: undefined },
  error: { type: String, default: '' },
  showMessage: { type: Boolean, default: true },
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: '' },
  inlineMessage: { type: [String, Boolean] as PropType<string | boolean>, default: '' },
  for: { type: String, default: '' },
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
