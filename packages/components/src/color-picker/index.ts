import { withInstall } from '@stellux/utils'
import ColorPicker from './color-picker.vue'

export const StxColorPicker = withInstall(ColorPicker)
export default StxColorPicker

export { colorPickerProps, colorPickerEmits } from './color-picker'
export type { ColorPickerProps, ColorPickerEmits } from './color-picker'
