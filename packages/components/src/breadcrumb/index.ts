import { withInstall } from '@stellux/utils'
import Breadcrumb from './breadcrumb.vue'
import BreadcrumbItem from './breadcrumb-item.vue'

export const StxBreadcrumb = withInstall(Breadcrumb)
export const StxBreadcrumbItem = withInstall(BreadcrumbItem)
export default StxBreadcrumb

export { breadcrumbProps } from './breadcrumb'
export { breadcrumbItemProps } from './breadcrumb-item'
export type { BreadcrumbProps } from './breadcrumb'
export type { BreadcrumbItemProps } from './breadcrumb-item'
