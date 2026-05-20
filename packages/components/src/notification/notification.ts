import type { Component, VNode, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export type NotificationType = 'success' | 'warning' | 'info' | 'error' | ''

export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export const notificationProps = {
  id: { type: String, default: '' },
  title: { type: String, default: '' },
  message: { type: [String, Object] as PropType<string | VNode>, default: '' },
  type: { type: String as PropType<NotificationType>, default: '' },
  icon: { type: definePropType<Component>(Object), default: undefined },
  duration: { type: Number, default: 4500 },
  showClose: { type: Boolean, default: true },
  position: {
    type: String as PropType<NotificationPosition>,
    default: 'top-right',
  },
  offset: { type: Number, default: 16 },
  zIndex: { type: Number, default: 0 },
  onClick: { type: Function as PropType<() => void>, default: undefined },
  onClose: { type: Function as PropType<() => void>, default: undefined },
} as const

export type NotificationProps = ExtractPropTypes<typeof notificationProps>

export interface NotificationOptions {
  title?: string
  message: string | VNode
  type?: NotificationType
  icon?: Component
  duration?: number
  showClose?: boolean
  position?: NotificationPosition
  offset?: number
  onClick?: () => void
  onClose?: () => void
}

export interface NotificationHandler {
  close: () => void
}

export type NotificationFn = ((options: NotificationOptions | string) => NotificationHandler) & {
  success: (options: NotificationOptions | string) => NotificationHandler
  warning: (options: NotificationOptions | string) => NotificationHandler
  info: (options: NotificationOptions | string) => NotificationHandler
  error: (options: NotificationOptions | string) => NotificationHandler
  closeAll: () => void
}
