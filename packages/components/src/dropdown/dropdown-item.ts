import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const dropdownItemProps = {
  command: { type: [String, Number, Object] as PropType<any>, default: undefined },
  disabled: Boolean,
  divided: Boolean,
  icon: { type: definePropType<Component>(Object), default: undefined },
} as const

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
