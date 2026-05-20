import { withInstall } from '@stellux/utils'
import Timeline from './timeline.vue'
import TimelineItem from './timeline-item.vue'

export const StxTimeline = withInstall(Timeline)
export const StxTimelineItem = withInstall(TimelineItem)
export default StxTimeline

export { timelineProps } from './timeline'
export type { TimelineProps } from './timeline'
export { timelineItemProps } from './timeline-item'
export type { TimelineItemProps } from './timeline-item'
