import type { InjectionKey } from 'vue'

export interface RadioGroupContext {
  modelValue: any
  size?: string
  disabled?: boolean
  textColor?: string
  fill?: string
  changeEvent: (val: any) => void
}

export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupContext')
