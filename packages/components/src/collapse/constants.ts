import type { InjectionKey, Ref } from 'vue'

export interface CollapseContext {
  activeNames: Ref<(string | number)[]>
  handleItemClick: (name: string | number) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContext')
