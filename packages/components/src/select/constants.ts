import type { InjectionKey, Ref } from 'vue'

export interface SelectContext {
  modelValue: Ref<any>
  multiple: Ref<boolean>
  disabled: Ref<boolean>
  filterQuery: Ref<string>
  handleOptionSelect: (value: any, label: string) => void
  isSelected: (value: any) => boolean
  hoveredValue: Ref<any>
  setHovered: (value: any) => void
  registerOption: (value: any, data: { label: string; disabled: boolean }) => void
  unregisterOption: (value: any) => void
}

export const selectContextKey: InjectionKey<SelectContext> = Symbol('selectContext')
