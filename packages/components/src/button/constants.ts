import type { InjectionKey } from 'vue'

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

export const buttonSizes = ['small', 'default', 'large'] as const

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export const buttonDirections = ['horizontal', 'vertical'] as const

export type ButtonType = (typeof buttonTypes)[number]
export type ButtonSize = (typeof buttonSizes)[number]
export type ButtonNativeType = (typeof buttonNativeTypes)[number]
export type ButtonDirection = (typeof buttonDirections)[number]

export interface ButtonGroupContext {
  type?: ButtonType
  size?: ButtonSize
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol('buttonGroupContext')
