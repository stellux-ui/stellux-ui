import { withInstall } from '@stellux/utils'
import Space from './space.vue'

export const StxSpace = withInstall(Space)
export default StxSpace

export { spaceProps } from './space'
export type { SpaceProps } from './space'
