import { withInstall } from '@stellux/utils'
import Image from './image.vue'
import ImageViewer from './image-viewer.vue'

export const StxImage = withInstall(Image)
export const StxImageViewer = withInstall(ImageViewer)
export default StxImage

export { imageProps, imageEmits } from './image'
export type { ImageProps, ImageEmits } from './image'
export { imageViewerProps, imageViewerEmits } from './image-viewer'
export type { ImageViewerProps, ImageViewerEmits } from './image-viewer'
