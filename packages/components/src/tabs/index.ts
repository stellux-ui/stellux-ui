import { withInstall } from '@stellux/utils'
import Tabs from './tabs.vue'
import TabPane from './tab-pane.vue'

export const StxTabs = withInstall(Tabs)
export const StxTabPane = withInstall(TabPane)
export default StxTabs

export { tabsProps, tabsEmits } from './tabs'
export type { TabsProps, TabsEmits } from './tabs'
export { tabPaneProps } from './tab-pane'
export type { TabPaneProps } from './tab-pane'
export * from './constants'
