import { withInstall } from '@stellux/utils'
import Cascader from './cascader.vue'

export const StxCascader = withInstall(Cascader)
export default StxCascader

export { cascaderProps, cascaderEmits } from './cascader'
export type {
  CascaderComponentProps,
  CascaderEmits,
  CascaderOption,
  CascaderProps,
} from './cascader'
