# Dialog

A modal dialog for displaying content that requires user interaction.

## Basic Usage

<div class="demo-block">
  <stx-button type="primary">Open Dialog</stx-button>
  <p style="color: var(--stx-color-text-secondary); margin-top: 8px;">Click to open a dialog (requires v-model binding in real usage)</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<stx-button type="primary" @click="visible = true">Open Dialog</stx-button>
<stx-dialog v-model="visible" title="Dialog Title" width="500">
  <p>This is the dialog body content.</p>
  <template #footer>
    <stx-button @click="visible = false">Cancel</stx-button>
    <stx-button type="primary" @click="visible = false">Confirm</stx-button>
  </template>
</stx-dialog>
```

## Fullscreen

```vue
<stx-dialog v-model="visible" title="Fullscreen Dialog" fullscreen>
  <p>This dialog takes up the entire screen.</p>
</stx-dialog>
```

## Draggable

```vue
<stx-dialog v-model="visible" title="Draggable Dialog" draggable>
  <p>You can drag this dialog by its header.</p>
</stx-dialog>
```

## Centered Content

```vue
<stx-dialog v-model="visible" title="Centered" center>
  <p>Header and footer are centered.</p>
  <template #footer>
    <stx-button @click="visible = false">Cancel</stx-button>
    <stx-button type="primary" @click="visible = false">OK</stx-button>
  </template>
</stx-dialog>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `boolean` | `false` | Visibility of the dialog |
| `title` | `string` | `''` | Title text |
| `width` | `string \| number` | `'50%'` | Width of the dialog |
| `fullscreen` | `boolean` | `false` | Fullscreen mode |
| `top` | `string` | `'15vh'` | CSS margin-top value |
| `modal` | `boolean` | `true` | Show modal overlay |
| `lockScroll` | `boolean` | `true` | Lock body scroll when open |
| `closeOnClickModal` | `boolean` | `true` | Close on overlay click |
| `closeOnPressEscape` | `boolean` | `true` | Close on Escape key |
| `showClose` | `boolean` | `true` | Show close button |
| `beforeClose` | `(done: () => void) => void` | -- | Callback before closing |
| `draggable` | `boolean` | `false` | Enable drag by header |
| `center` | `boolean` | `false` | Center header and footer |
| `destroyOnClose` | `boolean` | `false` | Destroy content on close |
| `appendToBody` | `boolean` | `true` | Append dialog to body |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `open` | -- | Triggered when dialog opens |
| `opened` | -- | Triggered after open transition ends |
| `close` | -- | Triggered when dialog closes |
| `closed` | -- | Triggered after close transition ends |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Dialog body content |
| `header` | Custom header content |
| `footer` | Footer content (action buttons) |
