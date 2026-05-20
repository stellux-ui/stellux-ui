import type { Component, ExtractPropTypes } from 'vue'
import { definePropType } from '@stellux/utils'

export const breadcrumbProps = {
  separator: { type: String, default: '/' },
  separatorIcon: { type: definePropType<Component>(Object), default: undefined },
} as const

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
