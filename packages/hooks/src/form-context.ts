import type { InjectionKey, Ref } from 'vue'
import type { RuleItem } from 'async-validator'

export type FormRules = Record<string, RuleItem | RuleItem[]>

export interface FormContext {
  model?: Record<string, any>
  rules?: FormRules
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
  labelSuffix?: string
  size?: string
  disabled?: boolean
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

export interface FormItemContext {
  prop?: string
  size?: Ref<string>
  disabled?: Ref<boolean>
  validate: (trigger?: string) => Promise<boolean>
  clearValidate: () => void
  resetField: () => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContext')
