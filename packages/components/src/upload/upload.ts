import type { ExtractPropTypes, PropType } from 'vue'

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadFile {
  name: string
  size?: number
  percentage?: number
  status: UploadStatus
  uid: number
  url?: string
  raw?: File
  response?: any
}

export type UploadRequestHandler = (options: {
  file: File
  filename: string
  action: string
  data?: Record<string, any>
  headers?: Record<string, string>
  onProgress: (evt: { percent: number }) => void
  onSuccess: (response: any) => void
  onError: (error: any) => void
}) => XMLHttpRequest | Promise<any>

export const uploadProps = {
  action: { type: String, default: '' },
  headers: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
  method: { type: String, default: 'post' },
  data: {
    type: [Object, Function] as PropType<
      Record<string, any> | ((file: UploadFile) => Record<string, any>)
    >,
    default: () => ({}),
  },
  name: { type: String, default: 'file' },
  withCredentials: Boolean,
  showFileList: { type: Boolean, default: true },
  drag: Boolean,
  accept: { type: String, default: '' },
  multiple: Boolean,
  limit: { type: Number, default: undefined },
  disabled: Boolean,
  autoUpload: { type: Boolean, default: true },
  listType: {
    type: String as PropType<'text' | 'picture' | 'picture-card'>,
    default: 'text',
  },
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => [],
  },
  beforeUpload: {
    type: Function as PropType<
      (file: File) => boolean | Promise<boolean | File>
    >,
    default: undefined,
  },
  beforeRemove: {
    type: Function as PropType<
      (file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>
    >,
    default: undefined,
  },
  onExceed: {
    type: Function as PropType<
      (files: File[], fileList: UploadFile[]) => void
    >,
    default: undefined,
  },
  httpRequest: {
    type: Function as PropType<UploadRequestHandler>,
    default: undefined,
  },
} as const

export const uploadEmits = {
  'update:fileList': (fileList: UploadFile[]) => true,
  change: (file: UploadFile, fileList: UploadFile[]) => true,
  success: (response: any, file: UploadFile, fileList: UploadFile[]) => true,
  error: (error: any, file: UploadFile, fileList: UploadFile[]) => true,
  progress: (evt: any, file: UploadFile, fileList: UploadFile[]) => true,
  remove: (file: UploadFile, fileList: UploadFile[]) => true,
  preview: (file: UploadFile) => true,
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits
