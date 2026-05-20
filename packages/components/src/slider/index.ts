import { withInstall } from '@stellux/utils'
import Slider from './slider.vue'

export const StxSlider = withInstall(Slider)
export default StxSlider

export { sliderProps, sliderEmits } from './slider'
export type { SliderProps, SliderEmits } from './slider'
