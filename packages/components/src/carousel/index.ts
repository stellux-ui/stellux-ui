import { withInstall } from '@stellux/utils'
import Carousel from './carousel.vue'
import CarouselItem from './carousel-item.vue'

export const StxCarousel = withInstall(Carousel)
export const StxCarouselItem = withInstall(CarouselItem)
export default StxCarousel

export { carouselProps, carouselEmits } from './carousel'
export type { CarouselProps, CarouselEmits } from './carousel'
export { carouselItemProps } from './carousel-item'
export type { CarouselItemProps } from './carousel-item'
export { carouselContextKey } from './constants'
export type { CarouselContext } from './constants'
