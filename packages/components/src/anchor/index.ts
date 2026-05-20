import { withInstall } from '@stellux/utils'
import Anchor from './anchor.vue'
import AnchorLink from './anchor-link.vue'

export const StxAnchor = withInstall(Anchor)
export const StxAnchorLink = withInstall(AnchorLink)
export default StxAnchor

export { anchorProps, anchorEmits } from './anchor'
export { anchorLinkProps } from './anchor-link'
export type { AnchorProps, AnchorEmits } from './anchor'
export type { AnchorLinkProps } from './anchor-link'
