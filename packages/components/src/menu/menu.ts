import type { ExtractPropTypes, PropType } from 'vue'

export const menuProps = {
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  defaultActive: {
    type: String,
    default: '',
  },
  defaultOpeneds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  uniqueOpened: Boolean,
  collapse: Boolean,
  backgroundColor: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
  activeTextColor: {
    type: String,
    default: '',
  },
  router: Boolean,
  collapseTransition: {
    type: Boolean,
    default: true,
  },
} as const

export type MenuProps = ExtractPropTypes<typeof menuProps>

export const menuEmits = {
  select: (index: string, _indexPath: string[]) =>
    typeof index === 'string',
  open: (index: string, _indexPath: string[]) =>
    typeof index === 'string',
  close: (index: string, _indexPath: string[]) =>
    typeof index === 'string',
}

export type MenuEmits = typeof menuEmits
