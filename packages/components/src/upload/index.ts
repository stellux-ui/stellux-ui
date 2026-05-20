import { withInstall } from '@stellux/utils'
import Upload from './upload.vue'

export const StxUpload = withInstall(Upload)
export default StxUpload

export { uploadProps, uploadEmits } from './upload'
export type { UploadProps, UploadEmits, UploadFile, UploadStatus, UploadRequestHandler } from './upload'
