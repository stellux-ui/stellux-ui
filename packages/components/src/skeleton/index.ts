import { withInstall } from '@stellux/utils'
import Skeleton from './skeleton.vue'
import SkeletonItem from './skeleton-item.vue'

export const StxSkeleton = withInstall(Skeleton)
export const StxSkeletonItem = withInstall(SkeletonItem)
export default StxSkeleton

export { skeletonProps } from './skeleton'
export type { SkeletonProps } from './skeleton'
export { skeletonItemProps } from './skeleton-item'
export type { SkeletonItemProps } from './skeleton-item'
