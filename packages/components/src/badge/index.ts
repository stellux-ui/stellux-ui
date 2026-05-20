import { withInstall } from '@stellux/utils'
import Badge from './badge.vue'

export const StxBadge = withInstall(Badge)
export default StxBadge

export { badgeProps } from './badge'
export type { BadgeProps } from './badge'
