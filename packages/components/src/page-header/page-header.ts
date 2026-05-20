import type { Component, ExtractPropTypes } from 'vue'
import { definePropType } from '@stellux/utils'

export const pageHeaderProps = {
  title: { type: String, default: 'Back' },
  icon: { type: definePropType<Component>(Object), default: undefined },
  content: { type: String, default: '' },
} as const

export const pageHeaderEmits = {
  back: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>
export type PageHeaderEmits = typeof pageHeaderEmits
