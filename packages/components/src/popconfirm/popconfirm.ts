import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const popconfirmProps = {
  title: { type: String, default: '' },
  confirmButtonText: { type: String, default: 'Yes' },
  cancelButtonText: { type: String, default: 'No' },
  confirmButtonType: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
    >,
    default: 'primary',
  },
  cancelButtonType: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
    >,
    default: 'default',
  },
  icon: { type: definePropType<Component>(Object), default: undefined },
  iconColor: { type: String, default: 'var(--stx-color-warning)' },
  hideIcon: Boolean,
  hideAfter: { type: Number, default: 200 },
  teleported: { type: Boolean, default: true },
  persistent: { type: Boolean, default: true },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 150,
  },
} as const

export const popconfirmEmits = {
  confirm: () => true,
  cancel: () => true,
}

export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>
export type PopconfirmEmits = typeof popconfirmEmits
