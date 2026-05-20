# Splitter

Resizable split panel layout for dividing content into multiple sections.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-splitter style="height: 200px;">
    <stx-splitter-panel :size="30">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-bg-soft);">Panel 1</div>
    </stx-splitter-panel>
    <stx-splitter-panel :size="70">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-bg-soft);">Panel 2</div>
    </stx-splitter-panel>
  </stx-splitter>
</div>

```vue
<stx-splitter style="height: 200px;">
  <stx-splitter-panel :size="30">
    <div>Panel 1</div>
  </stx-splitter-panel>
  <stx-splitter-panel :size="70">
    <div>Panel 2</div>
  </stx-splitter-panel>
</stx-splitter>
```

## Three Panels

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-splitter style="height: 200px;">
    <stx-splitter-panel :size="25" :min="10">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1);">Left</div>
    </stx-splitter-panel>
    <stx-splitter-panel :size="50" :min="20">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-bg-soft);">Center</div>
    </stx-splitter-panel>
    <stx-splitter-panel :size="25" :min="10">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1);">Right</div>
    </stx-splitter-panel>
  </stx-splitter>
</div>

```vue
<stx-splitter style="height: 200px;">
  <stx-splitter-panel :size="25" :min="10">
    <div>Left</div>
  </stx-splitter-panel>
  <stx-splitter-panel :size="50" :min="20">
    <div>Center</div>
  </stx-splitter-panel>
  <stx-splitter-panel :size="25" :min="10">
    <div>Right</div>
  </stx-splitter-panel>
</stx-splitter>
```

## Vertical

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-splitter direction="vertical" style="height: 300px;">
    <stx-splitter-panel :size="40">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-bg-soft);">Top</div>
    </stx-splitter-panel>
    <stx-splitter-panel :size="60">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-bg-soft);">Bottom</div>
    </stx-splitter-panel>
  </stx-splitter>
</div>

```vue
<stx-splitter direction="vertical" style="height: 300px;">
  <stx-splitter-panel :size="40">
    <div>Top</div>
  </stx-splitter-panel>
  <stx-splitter-panel :size="60">
    <div>Bottom</div>
  </stx-splitter-panel>
</stx-splitter>
```

## Collapsible

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-splitter style="height: 200px;">
    <stx-splitter-panel :size="30" collapsible :min="10">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-bg-soft);">Collapsible</div>
    </stx-splitter-panel>
    <stx-splitter-panel :size="70">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--vp-c-bg-soft);">Main</div>
    </stx-splitter-panel>
  </stx-splitter>
</div>

```vue
<stx-splitter style="height: 200px;">
  <stx-splitter-panel :size="30" collapsible :min="10">
    <div>Collapsible</div>
  </stx-splitter-panel>
  <stx-splitter-panel :size="70">
    <div>Main</div>
  </stx-splitter-panel>
</stx-splitter>
```

## API

### Splitter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Split direction |

### Splitter Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `resize-start` | `(sizes: number[])` | Resize drag started |
| `resize` | `(sizes: number[])` | Panels being resized |
| `resize-end` | `(sizes: number[])` | Resize drag ended |

### SplitterPanel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | — | Panel size as percentage |
| `min` | `number` | `0` | Minimum size percentage |
| `max` | `number` | `100` | Maximum size percentage |
| `collapsible` | `boolean` | `false` | Allow panel collapse |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Panel content |
