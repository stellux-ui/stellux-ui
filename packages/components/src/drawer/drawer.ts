import type { ExtractPropTypes, PropType } from 'vue'

export const drawerProps = {
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: [String, Number] as PropType<string | number>, default: '30%' },
  direction: { type: String as PropType<'rtl' | 'ltr' | 'ttb' | 'btt'>, default: 'rtl' },
  modal: { type: Boolean, default: true },
  lockScroll: { type: Boolean, default: true },
  closeOnClickModal: { type: Boolean, default: true },
  closeOnPressEscape: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  beforeClose: { type: Function as PropType<(done: () => void) => void>, default: undefined },
  withHeader: { type: Boolean, default: true },
  appendToBody: { type: Boolean, default: true },
  destroyOnClose: Boolean,
} as const

export const drawerEmits = {
  'update:modelValue': (val: boolean) => typeof val === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerEmits = typeof drawerEmits
