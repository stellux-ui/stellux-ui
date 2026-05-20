import type { InjectionKey, Ref } from 'vue'

export interface SplitterContext {
  direction: Ref<'horizontal' | 'vertical'>
  registerPanel: (id: string, size?: number, min?: number, max?: number) => void
  unregisterPanel: (id: string) => void
  getPanelStyle: (id: string) => Record<string, string>
}

export const splitterContextKey: InjectionKey<SplitterContext> = Symbol('splitterContext')
