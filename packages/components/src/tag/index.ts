import { withInstall } from '@stellux/utils'
import Tag from './tag.vue'

export const StxTag = withInstall(Tag)
export default StxTag

export { tagProps, tagEmits } from './tag'
export type { TagProps, TagEmits } from './tag'
