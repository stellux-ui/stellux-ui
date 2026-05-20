import type { ExtractPropTypes, PropType } from 'vue'

export const tagProps = {
  type: {
    type: String as PropType<'' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: '',
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  closable: Boolean,
  disableTransitions: Boolean,
  hit: Boolean,
  color: { type: String, default: '' },
  effect: {
    type: String as PropType<'dark' | 'light' | 'plain'>,
    default: 'light',
  },
  round: Boolean,
} as const

export const tagEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagEmits = typeof tagEmits
