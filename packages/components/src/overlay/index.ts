import { withInstall } from '@stellux/utils'
import Overlay from './overlay.vue'

export const StxOverlay = withInstall(Overlay)
export default StxOverlay
export { overlayProps, overlayEmits } from './overlay'
export type { OverlayProps, OverlayEmits } from './overlay'
