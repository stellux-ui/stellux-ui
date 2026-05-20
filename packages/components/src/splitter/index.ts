import { withInstall } from '@stellux/utils'
import Splitter from './splitter.vue'
import SplitterPanel from './splitter-panel.vue'

export const StxSplitter = withInstall(Splitter)
export const StxSplitterPanel = withInstall(SplitterPanel)
export default StxSplitter

export { splitterProps, splitterEmits } from './splitter'
export type { SplitterProps, SplitterEmits } from './splitter'
export { splitterPanelProps } from './splitter-panel'
export type { SplitterPanelProps } from './splitter-panel'
export * from './constants'
