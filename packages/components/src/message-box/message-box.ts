import type { Component, VNode, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export type MessageBoxAction = 'confirm' | 'cancel' | 'close'
export type MessageBoxType = '' | 'success' | 'warning' | 'info' | 'error'

export interface MessageBoxOptions {
  title?: string
  message: string | VNode
  type?: MessageBoxType
  icon?: Component
  showClose?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  distinguishCancelAndClose?: boolean
  lockScroll?: boolean
  showInput?: boolean
  inputPlaceholder?: string
  inputValue?: string
  inputType?: string
  inputPattern?: RegExp
  inputErrorMessage?: string
  beforeClose?: (action: MessageBoxAction, done: () => void) => void
  callback?: (action: MessageBoxAction, value?: string) => void
}

export interface MessageBoxData {
  value: string
  action: MessageBoxAction
}

export type MessageBoxFn = {
  (options: MessageBoxOptions): Promise<MessageBoxData>
  alert: (
    message: string | VNode,
    title?: string,
    options?: Partial<MessageBoxOptions>
  ) => Promise<MessageBoxData>
  confirm: (
    message: string | VNode,
    title?: string,
    options?: Partial<MessageBoxOptions>
  ) => Promise<MessageBoxData>
  prompt: (
    message: string | VNode,
    title?: string,
    options?: Partial<MessageBoxOptions>
  ) => Promise<MessageBoxData>
  close: () => void
}
