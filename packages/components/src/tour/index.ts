import { withInstall } from '@stellux/utils'
import Tour from './tour.vue'
import TourStep from './tour-step.vue'

export const StxTour = withInstall(Tour)
export const StxTourStep = withInstall(TourStep)
export default StxTour

export { tourProps, tourEmits } from './tour'
export type { TourProps, TourEmits } from './tour'
export { tourStepProps } from './tour-step'
export type { TourStepProps } from './tour-step'
export * from './constants'
