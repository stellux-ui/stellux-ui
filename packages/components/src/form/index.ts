import { withInstall } from '@stellux/utils'
import Form from './form.vue'
import FormItem from './form-item.vue'

export const StxForm = withInstall(Form)
export const StxFormItem = withInstall(FormItem)
export default StxForm
export { formProps } from './form'
export { formItemProps } from './form-item'
export type { FormProps } from './form'
export type { FormItemProps } from './form-item'
