# Drawer

A panel that slides in from the edge of the screen.

## Basic Usage

<div class="demo-block">
  <stx-button type="primary">Open Drawer</stx-button>
  <p style="color: var(--stx-color-text-secondary); margin-top: 8px;">Click to open a drawer (requires v-model binding in real usage)</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<stx-button type="primary" @click="visible = true">Open Drawer</stx-button>
<stx-drawer v-model="visible" title="Drawer Title">
  <p>Drawer body content goes here.</p>
</stx-drawer>
```

## Direction

```vue
<stx-drawer v-model="visible" title="Left Drawer" direction="ltr">
  <p>This drawer opens from the left.</p>
</stx-drawer>

<stx-drawer v-model="visible" title="Top Drawer" direction="ttb">
  <p>This drawer opens from the top.</p>
</stx-drawer>

<stx-drawer v-model="visible" title="Bottom Drawer" direction="btt">
  <p>This drawer opens from the bottom.</p>
</stx-drawer>
```

## Custom Size

```vue
<stx-drawer v-model="visible" title="Wide Drawer" size="50%">
  <p>This drawer takes up 50% of the screen.</p>
</stx-drawer>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `boolean` | `false` | Visibility of the drawer |
| `title` | `string` | `''` | Title text |
| `size` | `string \| number` | `'30%'` | Width or height depending on direction |
| `direction` | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | `'rtl'` | Open direction |
| `modal` | `boolean` | `true` | Show modal overlay |
| `lockScroll` | `boolean` | `true` | Lock body scroll when open |
| `closeOnClickModal` | `boolean` | `true` | Close on overlay click |
| `closeOnPressEscape` | `boolean` | `true` | Close on Escape key |
| `showClose` | `boolean` | `true` | Show close button |
| `beforeClose` | `(done: () => void) => void` | -- | Callback before closing |
| `withHeader` | `boolean` | `true` | Show header section |
| `appendToBody` | `boolean` | `true` | Append drawer to body |
| `destroyOnClose` | `boolean` | `false` | Destroy content on close |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `open` | -- | Triggered when drawer opens |
| `opened` | -- | Triggered after open transition ends |
| `close` | -- | Triggered when drawer closes |
| `closed` | -- | Triggered after close transition ends |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Drawer body content |
| `header` | Custom header content |
| `footer` | Footer content |
