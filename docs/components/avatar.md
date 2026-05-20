# Avatar

Represent a user or entity with an image, icon, or text.

## Basic Usage

<div class="demo-block">
  <stx-avatar src="https://i.pravatar.cc/150?img=1" />
  <stx-avatar>U</stx-avatar>
  <stx-avatar>AB</stx-avatar>
</div>

```vue
<stx-avatar src="https://i.pravatar.cc/150?img=1" />
<stx-avatar>U</stx-avatar>
<stx-avatar>AB</stx-avatar>
```

## Sizes

<div class="demo-block" style="align-items: center;">
  <stx-avatar :size="24">S</stx-avatar>
  <stx-avatar :size="32">M</stx-avatar>
  <stx-avatar :size="40">D</stx-avatar>
  <stx-avatar :size="56">L</stx-avatar>
</div>

```vue
<stx-avatar :size="24">S</stx-avatar>
<stx-avatar :size="32">M</stx-avatar>
<stx-avatar :size="40">D</stx-avatar>
<stx-avatar :size="56">L</stx-avatar>
```

## Shape

<div class="demo-block">
  <stx-avatar shape="circle">C</stx-avatar>
  <stx-avatar shape="square">S</stx-avatar>
</div>

```vue
<stx-avatar shape="circle">C</stx-avatar>
<stx-avatar shape="square">S</stx-avatar>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| 'small' \| 'default' \| 'large'` | `40` | Avatar size in pixels or preset |
| `shape` | `'circle' \| 'square'` | `'circle'` | Avatar shape |
| `src` | `string` | — | Image source URL |
| `alt` | `string` | — | Image alt text |
| `fit` | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` | Image fit mode |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Text or icon fallback content |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `error` | `(event: Event)` | Triggered on image load error |
