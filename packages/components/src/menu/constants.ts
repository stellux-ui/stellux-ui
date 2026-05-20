import type { InjectionKey, Ref } from 'vue'

export interface MenuContext {
  mode: Ref<'horizontal' | 'vertical'>
  isCollapsed: Ref<boolean>
  activeIndex: Ref<string>
  openedMenus: Ref<string[]>
  handleSelect: (index: string) => void
  handleOpen: (index: string) => void
  handleClose: (index: string) => void
}

export interface SubMenuContext {
  level: number
  addSubMenu: (uid: string) => void
  removeSubMenu: (uid: string) => void
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol('menuContext')
export const subMenuContextKey: InjectionKey<SubMenuContext> = Symbol('subMenuContext')
