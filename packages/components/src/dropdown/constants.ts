import type { InjectionKey } from 'vue'

export interface DropdownContext {
  handleCommand: (command: any) => void
  hideOnClick: boolean
  close: () => void
}

export const dropdownContextKey: InjectionKey<DropdownContext> =
  Symbol('dropdownContext')
