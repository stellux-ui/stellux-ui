import type { ExtractPropTypes, PropType } from 'vue'
import type { TabPaneData } from './constants'

export const tabsProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  type: {
    type: String as PropType<'' | 'card' | 'border-card'>,
    default: '',
  },
  closable: Boolean,
  addable: Boolean,
  editable: Boolean,
  tabPosition: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'top',
  },
  stretch: Boolean,
  beforeLeave: {
    type: Function as PropType<
      (
        newTab: string | number,
        oldTab: string | number,
      ) => boolean | Promise<boolean>
    >,
    default: undefined,
  },
} as const

export const tabsEmits = {
  'update:modelValue': (name: string | number) => true,
  'tab-click': (pane: TabPaneData, evt: Event) => true,
  'tab-change': (name: string | number) => true,
  'tab-remove': (name: string | number) => true,
  'tab-add': () => true,
  edit: (name: string | number | undefined, action: 'add' | 'remove') => true,
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits
