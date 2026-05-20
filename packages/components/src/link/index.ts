import { withInstall } from '@stellux/utils'
import Link from './link.vue'

export const StxLink = withInstall(Link)
export default StxLink

export { linkProps, linkEmits } from './link'
export type { LinkProps, LinkEmits } from './link'
