import { withInstall } from '@stellux/utils'
import Drawer from './drawer.vue'

export const StxDrawer = withInstall(Drawer)
export default StxDrawer

export { drawerProps, drawerEmits } from './drawer'
export type { DrawerProps, DrawerEmits } from './drawer'
