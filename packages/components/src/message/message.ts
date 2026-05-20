import type { Component, VNode, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const messageTypes = ['success', 'warning', 'info', 'error'] as const
export type MessageType = (typeof messageTypes)[number]

export const messageProps = {
  id: { type: String, default: '' },
  message: { type: [String, Object] as PropType<string | VNode>, default: '' },
  type: { type: String as PropType<MessageType>, default: 'info' },
  icon: { type: definePropType<Component>(Object), default: undefined },
  duration: { type: Number, default: 3000 },
  showClose: Boolean,
  center: Boolean,
  offset: { type: Number, default: 16 },
  zIndex: { type: Number, default: 0 },
  onClose: { type: Function as PropType<() => void>, default: undefined },
} as const

export type MessageProps = ExtractPropTypes<typeof messageProps>

export interface MessageOptions {
  message: string | VNode
  type?: MessageType
  icon?: Component
  duration?: number
  showClose?: boolean
  center?: boolean
  offset?: number
  onClose?: () => void
  grouping?: boolean
}

export interface MessageHandler {
  close: () => void
}

export type MessageFn = ((options: MessageOptions | string) => MessageHandler) & {
  success: (options: MessageOptions | string) => MessageHandler
  warning: (options: MessageOptions | string) => MessageHandler
  info: (options: MessageOptions | string) => MessageHandler
  error: (options: MessageOptions | string) => MessageHandler
  closeAll: () => void
}
