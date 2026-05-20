import type { ExtractPropTypes, PropType } from 'vue'

export const alertProps = {
  type: {
    type: String as PropType<'success' | 'warning' | 'info' | 'error'>,
    default: 'info',
  },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  closable: { type: Boolean, default: true },
  closeText: { type: String, default: '' },
  showIcon: Boolean,
  center: Boolean,
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
} as const

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
export type AlertEmits = typeof alertEmits
