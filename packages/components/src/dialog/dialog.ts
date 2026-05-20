import type { ExtractPropTypes, PropType } from 'vue'

export const dialogProps = {
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  width: { type: [String, Number] as PropType<string | number>, default: '50%' },
  fullscreen: Boolean,
  top: { type: String, default: '15vh' },
  modal: { type: Boolean, default: true },
  lockScroll: { type: Boolean, default: true },
  closeOnClickModal: { type: Boolean, default: true },
  closeOnPressEscape: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  beforeClose: { type: Function as PropType<(done: () => void) => void>, default: undefined },
  draggable: Boolean,
  center: Boolean,
  destroyOnClose: Boolean,
  appendToBody: { type: Boolean, default: true },
} as const

export const dialogEmits = {
  'update:modelValue': (val: boolean) => typeof val === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
