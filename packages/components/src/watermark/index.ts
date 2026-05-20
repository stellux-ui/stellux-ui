import { withInstall } from '@stellux/utils'
import Watermark from './watermark.vue'

export const StxWatermark = withInstall(Watermark)
export default StxWatermark

export { watermarkProps } from './watermark'
export type { WatermarkProps, WatermarkFont } from './watermark'
