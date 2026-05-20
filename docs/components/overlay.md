# Overlay

An internal mask layer component used by Dialog, Drawer, and other overlay-based components.

## Basic Usage

```vue
<stx-overlay :mask="true" @click="handleClose" />
```

## Custom Z-Index

```vue
<stx-overlay :mask="true" :z-index="2000" @click="handleClose" />
```

## Without Mask

```vue
<stx-overlay :mask="false" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mask` | `boolean` | `true` | Show the mask layer |
| `customMaskEvent` | `boolean` | `false` | Use custom mask click handling |
| `zIndex` | `number` | -- | Custom z-index value |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `click` | `(event: MouseEvent)` | Triggered when overlay is clicked |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content rendered above the overlay |
