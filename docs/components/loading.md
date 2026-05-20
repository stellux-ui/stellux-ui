# Loading

Display a loading indicator over a region or the full page.

## Directive Usage

```vue
<script setup>
import { ref } from 'vue'
const loading = ref(true)
</script>

<div v-loading="loading" style="height: 200px;">
  Content that is loading...
</div>
```

## Directive with Custom Text

```vue
<div
  v-loading="true"
  stx-loading-text="Loading data..."
  stx-loading-background="rgba(0, 0, 0, 0.7)"
  style="height: 200px;"
>
  Content area
</div>
```

## Service Usage

```typescript
import { StxLoading } from 'stellux-ui'

// Fullscreen loading
const loading = StxLoading({ fullscreen: true, text: 'Loading...' })

// Close after async operation
setTimeout(() => {
  loading.close()
}, 3000)
```

## Target Element

```typescript
import { StxLoading } from 'stellux-ui'

// Loading on a specific element
const loading = StxLoading({
  target: '#my-table',
  text: 'Fetching records...',
  background: 'rgba(255, 255, 255, 0.8)',
})

loading.close()
```

## Update Text

```typescript
import { StxLoading } from 'stellux-ui'

const loading = StxLoading({ fullscreen: true, text: 'Step 1...' })

setTimeout(() => {
  loading.setText('Step 2...')
}, 1500)

setTimeout(() => {
  loading.close()
}, 3000)
```

## API

### Directive

| Directive | Binding | Description |
|-----------|---------|-------------|
| `v-loading` | `boolean` | Show or hide loading overlay |

| Attribute | Type | Description |
|-----------|------|-------------|
| `stx-loading-text` | `string` | Loading text |
| `stx-loading-background` | `string` | Overlay background color |

### Service Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | `HTMLElement \| string` | `document.body` | Target element or selector |
| `fullscreen` | `boolean` | `false` | Fullscreen loading |
| `text` | `string` | `''` | Loading text |
| `background` | `string` | `''` | Overlay background color |
| `spinner` | `string` | -- | Custom spinner class |
| `customClass` | `string` | `''` | Custom CSS class |
| `lock` | `boolean` | `false` | Lock body scroll (fullscreen) |

### LoadingInstance

| Method | Parameters | Description |
|--------|------------|-------------|
| `close()` | -- | Close the loading instance |
| `setText(text)` | `string` | Update the loading text |
