import { withInstall } from '@stellux/utils'
import Switch from './switch.vue'

export const StxSwitch = withInstall(Switch)
export default StxSwitch

export { switchProps, switchEmits } from './switch'
export type { SwitchProps, SwitchEmits } from './switch'
