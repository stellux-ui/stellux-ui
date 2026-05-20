import { withInstall } from '@stellux/utils'
import InputTag from './input-tag.vue'

export const StxInputTag = withInstall(InputTag)
export default StxInputTag

export { inputTagProps, inputTagEmits } from './input-tag'
export type { InputTagProps, InputTagEmits } from './input-tag'
