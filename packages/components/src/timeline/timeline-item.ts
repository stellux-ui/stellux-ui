import type { ExtractPropTypes, PropType } from 'vue'
import type { Component } from 'vue'
import { definePropType } from '@stellux/utils'

export const timelineItemProps = {
  timestamp: { type: String, default: '' },
  hideTimestamp: Boolean,
  center: Boolean,
  placement: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'bottom',
  },
  type: {
    type: String as PropType<
      '' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    >,
    default: '',
  },
  color: { type: String, default: '' },
  size: {
    type: String as PropType<'normal' | 'large'>,
    default: 'normal',
  },
  icon: {
    type: definePropType<Component>(Object),
    default: undefined,
  },
  hollow: Boolean,
} as const

export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
