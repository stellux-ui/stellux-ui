import { withInstall } from '@stellux/utils'
import Dropdown from './dropdown.vue'
import DropdownItem from './dropdown-item.vue'
import DropdownMenu from './dropdown-menu.vue'

export const StxDropdown = withInstall(Dropdown)
export const StxDropdownItem = withInstall(DropdownItem)
export const StxDropdownMenu = withInstall(DropdownMenu)
export default StxDropdown

export { dropdownProps, dropdownEmits } from './dropdown'
export { dropdownItemProps } from './dropdown-item'
export type { DropdownProps, DropdownEmits } from './dropdown'
export type { DropdownItemProps } from './dropdown-item'
