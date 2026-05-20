import { withInstall } from '@stellux/utils'
import Affix from './affix.vue'

export const StxAffix = withInstall(Affix)
export default StxAffix

export { affixProps, affixEmits } from './affix'
export type { AffixProps, AffixEmits } from './affix'
