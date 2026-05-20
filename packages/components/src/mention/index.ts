import { withInstall } from '@stellux/utils'
import Mention from './mention.vue'

export const StxMention = withInstall(Mention)
export default StxMention

export { mentionProps, mentionEmits } from './mention'
export type { MentionProps, MentionEmits, MentionOption } from './mention'
