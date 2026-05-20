import { withInstall } from '@stellux/utils'
import Menu from './menu.vue'
import MenuItem from './menu-item.vue'
import MenuItemGroup from './menu-item-group.vue'
import SubMenu from './sub-menu.vue'

export const StxMenu = withInstall(Menu)
export const StxMenuItem = withInstall(MenuItem)
export const StxMenuItemGroup = withInstall(MenuItemGroup)
export const StxSubMenu = withInstall(SubMenu)
export default StxMenu

export { menuProps, menuEmits } from './menu'
export type { MenuProps, MenuEmits } from './menu'
export { menuItemProps, menuItemEmits } from './menu-item'
export type { MenuItemProps, MenuItemEmits } from './menu-item'
export { menuItemGroupProps } from './menu-item-group'
export type { MenuItemGroupProps } from './menu-item-group'
export { subMenuProps } from './sub-menu'
export type { SubMenuProps } from './sub-menu'
export * from './constants'
