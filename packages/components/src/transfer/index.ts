import { withInstall } from '@stellux/utils'
import Transfer from './transfer.vue'

export const StxTransfer = withInstall(Transfer)
export default StxTransfer

export { transferProps, transferEmits } from './transfer'
export type { TransferProps, TransferEmits, TransferData } from './transfer'
