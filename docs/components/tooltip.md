# Tooltip

Display informative text when hovering over or clicking an element.

## Basic Usage

<div class="demo-block" style="gap: 16px;">
  <stx-tooltip content="Top tooltip" placement="top">
    <stx-button>Top</stx-button>
  </stx-tooltip>
  <stx-tooltip content="Bottom tooltip" placement="bottom">
    <stx-button>Bottom</stx-button>
  </stx-tooltip>
  <stx-tooltip content="Left tooltip" placement="left">
    <stx-button>Left</stx-button>
  </stx-tooltip>
  <stx-tooltip content="Right tooltip" placement="right">
    <stx-button>Right</stx-button>
  </stx-tooltip>
</div>

```vue
<stx-tooltip content="Top tooltip" placement="top">
  <stx-button>Top</stx-button>
</stx-tooltip>
<stx-tooltip content="Bottom tooltip" placement="bottom">
  <stx-button>Bottom</stx-button>
</stx-tooltip>
```

## Placements

<div class="demo-block" style="flex-direction: column; align-items: center; gap: 8px;">
  <div style="display: flex; gap: 8px; justify-content: center;">
    <stx-tooltip content="top-start" placement="top-start">
      <stx-button>top-start</stx-button>
    </stx-tooltip>
    <stx-tooltip content="top" placement="top">
      <stx-button>top</stx-button>
    </stx-tooltip>
    <stx-tooltip content="top-end" placement="top-end">
      <stx-button>top-end</stx-button>
    </stx-tooltip>
  </div>
  <div style="display: flex; gap: 8px; justify-content: center;">
    <stx-tooltip content="bottom-start" placement="bottom-start">
      <stx-button>bottom-start</stx-button>
    </stx-tooltip>
    <stx-tooltip content="bottom" placement="bottom">
      <stx-button>bottom</stx-button>
    </stx-tooltip>
    <stx-tooltip content="bottom-end" placement="bottom-end">
      <stx-button>bottom-end</stx-button>
    </stx-tooltip>
  </div>
</div>

```vue
<stx-tooltip content="top-start" placement="top-start">
  <stx-button>top-start</stx-button>
</stx-tooltip>
<stx-tooltip content="bottom" placement="bottom">
  <stx-button>bottom</stx-button>
</stx-tooltip>
```

## Theme

<div class="demo-block" style="gap: 16px;">
  <stx-tooltip content="Dark theme" effect="dark">
    <stx-button>Dark</stx-button>
  </stx-tooltip>
  <stx-tooltip content="Light theme" effect="light">
    <stx-button>Light</stx-button>
  </stx-tooltip>
</div>

```vue
<stx-tooltip content="Dark theme" effect="dark">
  <stx-button>Dark</stx-button>
</stx-tooltip>
<stx-tooltip content="Light theme" effect="light">
  <stx-button>Light</stx-button>
</stx-tooltip>
```

## Click Trigger

<div class="demo-block">
  <stx-tooltip content="Click to show" trigger="click">
    <stx-button type="primary">Click Me</stx-button>
  </stx-tooltip>
</div>

```vue
<stx-tooltip content="Click to show" trigger="click">
  <stx-button type="primary">Click Me</stx-button>
</stx-tooltip>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Tooltip content |
| `rawContent` | `boolean` | `false` | Render content as raw HTML |
| `placement` | `Placement` | `'bottom'` | Tooltip position |
| `effect` | `'dark' \| 'light'` | `'dark'` | Theme style |
| `visible` | `boolean` | — | Manual visibility control |
| `disabled` | `boolean` | `false` | Disable the tooltip |
| `offset` | `number` | `8` | Offset from reference element |
| `transition` | `string` | `'stx-fade-in-linear'` | CSS transition name |
| `showArrow` | `boolean` | `true` | Show tooltip arrow |
| `showAfter` | `number` | `0` | Delay before showing (ms) |
| `hideAfter` | `number` | `200` | Delay before hiding (ms) |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'contextmenu'` | `'hover'` | Trigger mode |
| `enterable` | `boolean` | `true` | Allow mouse to enter tooltip |
| `popperClass` | `string` | `''` | Custom class for tooltip |
| `teleported` | `boolean` | `true` | Teleport to body |
| `persistent` | `boolean` | `true` | Keep in DOM when hidden |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `update:visible` | `(value: boolean)` | Visibility change |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Trigger element |
| `content` | Custom tooltip content |
