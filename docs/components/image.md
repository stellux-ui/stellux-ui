# Image

Display images with lazy loading, fit modes, and placeholder support.

## Basic Usage

<div class="demo-block">
  <stx-image src="https://picsum.photos/200/200" style="width: 200px; height: 200px;" />
</div>

```vue
<stx-image src="https://picsum.photos/200/200" style="width: 200px; height: 200px;" />
```

## Fit Modes

<div class="demo-block" style="gap: 16px;">
  <stx-image src="https://picsum.photos/300/200" fit="fill" style="width: 120px; height: 120px;" />
  <stx-image src="https://picsum.photos/300/200" fit="contain" style="width: 120px; height: 120px;" />
  <stx-image src="https://picsum.photos/300/200" fit="cover" style="width: 120px; height: 120px;" />
  <stx-image src="https://picsum.photos/300/200" fit="none" style="width: 120px; height: 120px;" />
  <stx-image src="https://picsum.photos/300/200" fit="scale-down" style="width: 120px; height: 120px;" />
</div>

```vue
<stx-image src="..." fit="fill" style="width: 120px; height: 120px;" />
<stx-image src="..." fit="contain" style="width: 120px; height: 120px;" />
<stx-image src="..." fit="cover" style="width: 120px; height: 120px;" />
<stx-image src="..." fit="none" style="width: 120px; height: 120px;" />
<stx-image src="..." fit="scale-down" style="width: 120px; height: 120px;" />
```

## Placeholder & Error

<div class="demo-block">
  <stx-image src="" style="width: 200px; height: 200px;">
    <template #placeholder>
      <span>Loading...</span>
    </template>
    <template #error>
      <span>Failed to load</span>
    </template>
  </stx-image>
</div>

```vue
<stx-image src="invalid-url.jpg">
  <template #placeholder>
    <span>Loading...</span>
  </template>
  <template #error>
    <span>Failed to load</span>
  </template>
</stx-image>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image source URL |
| `fit` | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | — | Object-fit mode |
| `alt` | `string` | — | Alt text |
| `lazy` | `boolean` | `false` | Enable lazy loading |
| `previewSrcList` | `string[]` | — | Image preview list |
| `initialIndex` | `number` | `0` | Initial preview index |
| `zIndex` | `number` | — | Preview overlay z-index |

### Slots

| Slot | Description |
|------|-------------|
| `placeholder` | Loading placeholder |
| `error` | Error fallback content |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `load` | `(event: Event)` | Image loaded |
| `error` | `(event: Event)` | Image load failed |
