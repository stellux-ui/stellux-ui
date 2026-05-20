import type { InjectionKey, Ref } from 'vue'

export interface TabPaneData {
  name: string | number
  label: string
  disabled: boolean
  closable: boolean
  lazy: boolean
}

export interface TabsContext {
  activeTab: Ref<string | number>
  registerPane: (pane: TabPaneData) => void
  unregisterPane: (name: string | number) => void
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('tabsContext')
