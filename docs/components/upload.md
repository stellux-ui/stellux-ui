# Upload

Upload files by clicking or dragging into a designated area.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Upload requires action URL and event handlers. See code example below.</p>
</div>

```vue
<stx-upload action="https://api.example.com/upload">
  <stx-button type="primary">Click to Upload</stx-button>
</stx-upload>
```

## Drag Upload

```vue
<stx-upload action="https://api.example.com/upload" drag>
  <p>Drop file here or click to upload</p>
</stx-upload>
```

## File List

```vue
<script setup>
import { ref } from 'vue'
const fileList = ref([
  { name: 'document.pdf', url: 'https://example.com/document.pdf' },
])
</script>

<stx-upload action="https://api.example.com/upload" :file-list="fileList" :limit="3">
  <stx-button type="primary">Upload File</stx-button>
  <template #tip>
    <p>Only PDF files, max 10MB</p>
  </template>
</stx-upload>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `string` | — | Upload URL |
| `method` | `string` | `'post'` | HTTP method |
| `headers` | `object` | — | Request headers |
| `data` | `object` | — | Extra form data |
| `name` | `string` | `'file'` | Upload field name |
| `fileList` | `Array` | `[]` | Default file list |
| `drag` | `boolean` | `false` | Enable drag upload |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `accept` | `string` | — | Accepted file types |
| `limit` | `number` | — | Max number of files |
| `disabled` | `boolean` | `false` | Disabled state |
| `autoUpload` | `boolean` | `true` | Upload on file select |
| `listType` | `'text' \| 'picture' \| 'picture-card'` | `'text'` | File list display type |
| `showFileList` | `boolean` | `true` | Show file list |
| `beforeUpload` | `(file: File) => boolean \| Promise` | — | Pre-upload hook |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `success` | `(response, file, fileList)` | Upload succeeded |
| `error` | `(error, file, fileList)` | Upload failed |
| `change` | `(file, fileList)` | File status changed |
| `remove` | `(file, fileList)` | File removed |
| `exceed` | `(files, fileList)` | Limit exceeded |
| `progress` | `(event, file, fileList)` | Upload progress |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Trigger content |
| `tip` | Tip content below trigger |
| `trigger` | Trigger content (used with tip) |
