import { withInstall } from '@stellux/utils'
import Segmented from './segmented.vue'

export const StxSegmented = withInstall(Segmented)
export default StxSegmented

export { segmentedProps, segmentedEmits } from './segmented'
export type { SegmentedProps, SegmentedEmits, SegmentedOption } from './segmented'
