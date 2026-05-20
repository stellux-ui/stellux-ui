import { withInstall } from '@stellux/utils'
import Dialog from './dialog.vue'

export const StxDialog = withInstall(Dialog)
export default StxDialog

export { dialogProps, dialogEmits } from './dialog'
export type { DialogProps, DialogEmits } from './dialog'
