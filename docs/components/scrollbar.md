# Scrollbar

Custom scrollbar to replace the native browser scrollbar.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-scrollbar height="200px">
    <p style="padding: 12px;">Item 1</p>
    <p style="padding: 12px;">Item 2</p>
    <p style="padding: 12px;">Item 3</p>
    <p style="padding: 12px;">Item 4</p>
    <p style="padding: 12px;">Item 5</p>
    <p style="padding: 12px;">Item 6</p>
    <p style="padding: 12px;">Item 7</p>
    <p style="padding: 12px;">Item 8</p>
    <p style="padding: 12px;">Item 9</p>
    <p style="padding: 12px;">Item 10</p>
  </stx-scrollbar>
</div>

```vue
<stx-scrollbar height="200px">
  <p>Item 1</p>
  <p>Item 2</p>
  <p>Item 3</p>
  ...
</stx-scrollbar>
```

## Max Height

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-scrollbar max-height="150px">
    <p style="padding: 12px;">Item 1</p>
    <p style="padding: 12px;">Item 2</p>
    <p style="padding: 12px;">Item 3</p>
    <p style="padding: 12px;">Item 4</p>
    <p style="padding: 12px;">Item 5</p>
    <p style="padding: 12px;">Item 6</p>
  </stx-scrollbar>
</div>

```vue
<stx-scrollbar max-height="150px">
  <p>Item 1</p>
  <p>Item 2</p>
  ...
</stx-scrollbar>
```

## Horizontal Scroll

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-scrollbar>
    <div style="display: flex; gap: 12px;">
      <stx-button v-for="i in 20" :key="i" type="primary">Item {{ i }}</stx-button>
    </div>
  </stx-scrollbar>
</div>

```vue
<stx-scrollbar>
  <div style="display: flex; gap: 12px;">
    <stx-button v-for="i in 20" :key="i" type="primary">
      Item {{ i }}
    </stx-button>
  </div>
</stx-scrollbar>
```

## Always Visible

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-scrollbar height="150px" always>
    <p style="padding: 12px;">Item 1</p>
    <p style="padding: 12px;">Item 2</p>
    <p style="padding: 12px;">Item 3</p>
    <p style="padding: 12px;">Item 4</p>
    <p style="padding: 12px;">Item 5</p>
    <p style="padding: 12px;">Item 6</p>
  </stx-scrollbar>
</div>

```vue
<stx-scrollbar height="150px" always>
  ...
</stx-scrollbar>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string \| number` | `''` | Container height |
| `maxHeight` | `string \| number` | `''` | Container max height |
| `native` | `boolean` | `false` | Use native scrollbar |
| `wrapStyle` | `StyleValue` | `''` | Custom wrap container style |
| `wrapClass` | `string \| string[]` | `''` | Custom wrap container class |
| `viewStyle` | `StyleValue` | `''` | Custom view style |
| `viewClass` | `string \| string[]` | `''` | Custom view class |
| `noresize` | `boolean` | `false` | Do not respond to resize |
| `tag` | `string` | `'div'` | View element tag |
| `always` | `boolean` | `false` | Always show scrollbar |
| `minSize` | `number` | `20` | Minimum scrollbar thumb size |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `scroll` | `({ scrollTop, scrollLeft })` | Fires when content scrolls |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Scrollable content |

### Exposed Methods

| Method | Description |
|--------|-------------|
| `scrollTo(options)` | Scroll to position |
| `setScrollTop(val)` | Set scroll top |
| `setScrollLeft(val)` | Set scroll left |
| `update()` | Manually update scrollbar |
