import type { ExtractPropTypes, PropType } from 'vue'
import type { FormRules } from '@stellux/hooks'

export const formProps = {
  model: { type: Object as PropType<Record<string, any>>, default: undefined },
  rules: { type: Object as PropType<FormRules>, default: undefined },
  labelWidth: { type: [String, Number] as PropType<string | number>, default: '' },
  labelPosition: { type: String as PropType<'left' | 'right' | 'top'>, default: 'right' },
  labelSuffix: { type: String, default: '' },
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
  disabled: Boolean,
  inline: Boolean,
  showMessage: { type: Boolean, default: true },
  statusIcon: Boolean,
  hideRequiredAsterisk: Boolean,
  requireAsteriskPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
  scrollToError: Boolean,
} as const

export type FormProps = ExtractPropTypes<typeof formProps>
