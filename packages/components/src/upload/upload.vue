<script setup lang="ts">
import { ref, shallowRef, computed, watch } from 'vue'
import { useNamespace, useFormDisabled } from '@stellux/hooks'
import { uploadProps, uploadEmits } from './upload'
import type { UploadFile, UploadStatus } from './upload'
import StxButton from '../button/button.vue'

defineOptions({ name: 'StxUpload' })

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)

const ns = useNamespace('upload')
const actualDisabled = useFormDisabled(props)

const inputRef = shallowRef<HTMLInputElement>()
const dragOver = ref(false)
const uploadFiles = ref<UploadFile[]>([...props.fileList])
const xhrMap = new Map<number, XMLHttpRequest>()

let tempIndex = 1

watch(
  () => props.fileList,
  (newList) => {
    uploadFiles.value = newList.map((file) => ({
      ...file,
      uid: file.uid || Date.now() + tempIndex++,
      status: file.status || 'success',
    }))
  },
  { deep: true }
)

function getFileUid(): number {
  return Date.now() + tempIndex++
}

function handleTriggerClick() {
  if (actualDisabled.value) return
  inputRef.value!.value = ''
  inputRef.value!.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const rawFiles = Array.from(target.files || [])
  if (!rawFiles.length) return
  uploadRawFiles(rawFiles)
}

function handleDrop(event: DragEvent) {
  if (actualDisabled.value) return
  dragOver.value = false
  const rawFiles = Array.from(event.dataTransfer?.files || [])
  if (!rawFiles.length) return
  uploadRawFiles(rawFiles)
}

function uploadRawFiles(rawFiles: File[]) {
  if (props.limit && uploadFiles.value.length + rawFiles.length > props.limit) {
    props.onExceed?.(rawFiles, uploadFiles.value)
    return
  }

  const filesToUpload: UploadFile[] = []

  for (const rawFile of rawFiles) {
    const uploadFile: UploadFile = {
      name: rawFile.name,
      size: rawFile.size,
      percentage: 0,
      status: 'ready',
      uid: getFileUid(),
      raw: rawFile,
    }

    if (props.listType !== 'text') {
      try {
        uploadFile.url = URL.createObjectURL(rawFile)
      } catch {
        // ignore
      }
    }

    filesToUpload.push(uploadFile)
    uploadFiles.value.push(uploadFile)
  }

  emitFileList()

  if (props.autoUpload) {
    for (const file of filesToUpload) {
      upload(file)
    }
  }
}

async function upload(file: UploadFile) {
  if (!file.raw) return

  if (props.beforeUpload) {
    let result: boolean | File
    try {
      result = await props.beforeUpload(file.raw)
    } catch {
      removeFile(file)
      return
    }

    if (result === false) {
      removeFile(file)
      return
    }

    if (result instanceof File) {
      file.raw = result
      file.name = result.name
      file.size = result.size
    }
  }

  file.status = 'uploading'
  file.percentage = 0
  emit('change', file, uploadFiles.value)

  const data =
    typeof props.data === 'function' ? props.data(file) : props.data

  if (props.httpRequest) {
    props.httpRequest({
      file: file.raw,
      filename: props.name,
      action: props.action,
      data,
      headers: props.headers,
      onProgress: (evt) => handleProgress(evt, file),
      onSuccess: (response) => handleSuccess(response, file),
      onError: (error) => handleError(error, file),
    })
    return
  }

  const xhr = new XMLHttpRequest()
  xhrMap.set(file.uid, xhr)

  if (xhr.upload) {
    xhr.upload.addEventListener('progress', (evt) => {
      if (evt.lengthComputable) {
        handleProgress({ percent: Math.round((evt.loaded / evt.total) * 100) }, file)
      }
    })
  }

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response: any
      try {
        response = JSON.parse(xhr.responseText)
      } catch {
        response = xhr.responseText
      }
      handleSuccess(response, file)
    } else {
      handleError(new Error(`Upload failed with status ${xhr.status}`), file)
    }
    xhrMap.delete(file.uid)
  })

  xhr.addEventListener('error', () => {
    handleError(new Error('Upload failed: network error'), file)
    xhrMap.delete(file.uid)
  })

  const formData = new FormData()
  formData.append(props.name, file.raw)

  if (data) {
    for (const [key, val] of Object.entries(data)) {
      formData.append(key, val as string)
    }
  }

  xhr.open(props.method, props.action, true)
  xhr.withCredentials = props.withCredentials

  if (props.headers) {
    for (const [key, val] of Object.entries(props.headers)) {
      xhr.setRequestHeader(key, val)
    }
  }

  xhr.send(formData)
}

function handleProgress(evt: { percent: number }, file: UploadFile) {
  file.percentage = evt.percent
  file.status = 'uploading'
  emit('progress', evt, file, uploadFiles.value)
}

function handleSuccess(response: any, file: UploadFile) {
  file.status = 'success'
  file.percentage = 100
  file.response = response
  emit('success', response, file, uploadFiles.value)
  emit('change', file, uploadFiles.value)
  emitFileList()
}

function handleError(error: any, file: UploadFile) {
  file.status = 'fail'
  emit('error', error, file, uploadFiles.value)
  emit('change', file, uploadFiles.value)
  emitFileList()
}

async function handleRemove(file: UploadFile) {
  if (props.beforeRemove) {
    let canRemove: boolean
    try {
      canRemove = await props.beforeRemove(file, uploadFiles.value)
    } catch {
      return
    }
    if (!canRemove) return
  }

  abort(file)
  removeFile(file)
}

function removeFile(file: UploadFile) {
  const idx = uploadFiles.value.findIndex((f) => f.uid === file.uid)
  if (idx > -1) {
    uploadFiles.value.splice(idx, 1)
    emit('remove', file, uploadFiles.value)
    emitFileList()
  }
}

function handlePreview(file: UploadFile) {
  emit('preview', file)
}

function emitFileList() {
  emit('update:fileList', [...uploadFiles.value])
}

function abort(file?: UploadFile) {
  if (file) {
    const xhr = xhrMap.get(file.uid)
    if (xhr) {
      xhr.abort()
      xhrMap.delete(file.uid)
    }
  } else {
    xhrMap.forEach((xhr) => xhr.abort())
    xhrMap.clear()
  }
}

function submit() {
  uploadFiles.value
    .filter((f) => f.status === 'ready')
    .forEach((f) => upload(f))
}

function clearFiles() {
  abort()
  uploadFiles.value = []
  emitFileList()
}

defineExpose({
  submit,
  clearFiles,
  abort,
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(listType),
      ns.is('drag', drag),
      ns.is('disabled', actualDisabled),
    ]"
  >
    <div
      :class="ns.e('trigger')"
      @click="handleTriggerClick"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @dragenter.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
    >
      <slot>
        <div
          v-if="drag"
          :class="[ns.e('dragger'), ns.is('dragover', dragOver)]"
        >
          <svg
            :class="ns.e('dragger-icon')"
            viewBox="0 0 24 24"
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div :class="ns.e('dragger-text')">
            Drop file here or <em>click to upload</em>
          </div>
        </div>
        <stx-button v-else type="primary" :disabled="actualDisabled">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="margin-right: 6px"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Click to upload
        </stx-button>
      </slot>
      <input
        ref="inputRef"
        type="file"
        :class="ns.e('input')"
        :accept="accept"
        :multiple="multiple"
        @change="handleFileChange"
      />
    </div>

    <slot name="tip" />

    <div v-if="showFileList && uploadFiles.length" :class="ns.e('file-list')">
      <div
        v-for="file in uploadFiles"
        :key="file.uid"
        :class="[ns.e('file'), ns.is(file.status)]"
      >
        <img
          v-if="listType !== 'text' && file.url"
          :class="ns.e('file-thumb')"
          :src="file.url"
          alt=""
          @click="handlePreview(file)"
        />
        <span :class="ns.e('file-name')" @click="handlePreview(file)">
          <svg
            v-if="listType === 'text'"
            :class="ns.e('file-icon')"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          {{ file.name }}
        </span>
        <div
          v-if="file.status === 'uploading'"
          :class="ns.e('file-progress')"
        >
          <div
            :class="ns.e('file-progress-bar')"
            :style="{ width: (file.percentage || 0) + '%' }"
          />
        </div>
        <span :class="ns.e('file-actions')">
          <span
            v-if="file.status === 'success'"
            :class="ns.e('file-status')"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span
            v-if="file.status === 'fail'"
            :class="ns.e('file-status--fail')"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </span>
          <span :class="ns.e('file-remove')" @click.stop="handleRemove(file)">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
