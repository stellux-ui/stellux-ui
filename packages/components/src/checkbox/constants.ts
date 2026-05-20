import type { InjectionKey, Ref } from 'vue'

export interface CheckboxGroupContext {
  modelValue: Ref<any[]>
  size?: string
  disabled?: boolean
  min?: number
  max?: number
  changeEvent: (val: any[]) => void
}

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupContext')
