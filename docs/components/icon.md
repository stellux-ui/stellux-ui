# Icon

Wraps SVG icons with standardized sizing and coloring.

## Basic Usage

<div class="demo-block">
  <stx-icon size="24" color="var(--stx-color-primary)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </stx-icon>
  <stx-icon size="32" color="var(--stx-color-danger)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  </stx-icon>
  <stx-icon size="20" color="var(--stx-color-success)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
  </stx-icon>
</div>

```vue
<stx-icon size="24" color="var(--stx-color-primary)">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
</stx-icon>
```

## Sizes

<div class="demo-block">
  <stx-icon size="16" color="var(--stx-color-primary)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </stx-icon>
  <stx-icon size="24" color="var(--stx-color-primary)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </stx-icon>
  <stx-icon size="32" color="var(--stx-color-primary)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </stx-icon>
  <stx-icon size="48" color="var(--stx-color-primary)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </stx-icon>
</div>

```vue
<stx-icon size="16">...</stx-icon>
<stx-icon size="24">...</stx-icon>
<stx-icon size="32">...</stx-icon>
<stx-icon size="48">...</stx-icon>
```

## Colors

<div class="demo-block">
  <stx-icon size="24" color="var(--stx-color-primary)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </stx-icon>
  <stx-icon size="24" color="var(--stx-color-success)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
  </stx-icon>
  <stx-icon size="24" color="var(--stx-color-warning)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
  </stx-icon>
  <stx-icon size="24" color="var(--stx-color-danger)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  </stx-icon>
  <stx-icon size="24" color="var(--stx-color-info)">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  </stx-icon>
</div>

```vue
<stx-icon size="24" color="var(--stx-color-primary)">...</stx-icon>
<stx-icon size="24" color="var(--stx-color-success)">...</stx-icon>
<stx-icon size="24" color="var(--stx-color-warning)">...</stx-icon>
<stx-icon size="24" color="var(--stx-color-danger)">...</stx-icon>
<stx-icon size="24" color="var(--stx-color-info)">...</stx-icon>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | — | Icon size in pixels |
| `color` | `string` | — | Icon color (CSS color value) |
| `component` | `Component` | — | Vue component to render as icon |

### Slots

| Slot | Description |
|------|-------------|
| `default` | SVG or icon content |
