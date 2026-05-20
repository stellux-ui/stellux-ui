# Affix

Pin an element to a fixed position on the viewport while scrolling.

## Basic Usage

```vue
<stx-affix :offset="120">
  <stx-button type="primary">Affixed at 120px from top</stx-button>
</stx-affix>
```

## Bottom Position

```vue
<stx-affix position="bottom" :offset="20">
  <stx-button type="primary">Affixed at 20px from bottom</stx-button>
</stx-affix>
```

## Target Container

```vue
<stx-affix target=".scroll-container" :offset="80">
  <stx-button type="primary">Affixed within container</stx-button>
</stx-affix>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `offset` | `number` | `0` | Offset from the position edge in px |
| `position` | `'top' \| 'bottom'` | `'top'` | Affix position |
| `target` | `string` | `''` | CSS selector of the target container |
| `zIndex` | `number` | `100` | Z-index when affixed |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(fixed: boolean)` | Triggered when affix state changes |
| `scroll` | `({ scrollTop: number, fixed: boolean })` | Triggered on scroll |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content to affix |
