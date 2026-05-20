import { withInstall } from '@stellux/utils'
import Descriptions from './descriptions.vue'
import DescriptionsItem from './descriptions-item.vue'

export const StxDescriptions = withInstall(Descriptions)
export const StxDescriptionsItem = withInstall(DescriptionsItem)
export default StxDescriptions

export { descriptionsProps } from './descriptions'
export type { DescriptionsProps } from './descriptions'
export { descriptionsItemProps } from './descriptions-item'
export type { DescriptionsItemProps } from './descriptions-item'
