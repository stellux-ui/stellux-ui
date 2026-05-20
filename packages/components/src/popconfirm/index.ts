import { withInstall } from '@stellux/utils'
import Popconfirm from './popconfirm.vue'

export const StxPopconfirm = withInstall(Popconfirm)
export default StxPopconfirm

export { popconfirmProps, popconfirmEmits } from './popconfirm'
export type { PopconfirmProps, PopconfirmEmits } from './popconfirm'
