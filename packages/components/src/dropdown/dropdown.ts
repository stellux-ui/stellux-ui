import type { ExtractPropTypes, PropType } from 'vue'

export const dropdownProps = {
  trigger: { type: String as PropType<'hover' | 'click' | 'contextmenu'>, default: 'hover' },
  placement: { type: String as PropType<string>, default: 'bottom' },
  disabled: Boolean,
  hideOnClick: { type: Boolean, default: true },
  showTimeout: { type: Number, default: 150 },
  hideTimeout: { type: Number, default: 150 },
  tabindex: { type: [Number, String], default: 0 },
  maxHeight: { type: [Number, String], default: '' },
  popperClass: { type: String, default: '' },
  teleported: { type: Boolean, default: true },
} as const

export const dropdownEmits = {
  command: (command: any) => true,
  'visible-change': (visible: boolean) => true,
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownEmits = typeof dropdownEmits
