import { withInstall } from '@stellux/utils'
import PageHeader from './page-header.vue'

export const StxPageHeader = withInstall(PageHeader)
export default StxPageHeader

export { pageHeaderProps, pageHeaderEmits } from './page-header'
export type { PageHeaderProps, PageHeaderEmits } from './page-header'
