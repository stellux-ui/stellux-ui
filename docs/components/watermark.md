# Watermark

Add a watermark overlay to a content area for protection or branding.

## Basic Usage

<div class="demo-block">
  <stx-watermark content="Stellux UI">
    <div style="height: 200px; display: flex; align-items: center; justify-content: center;">
      <stx-text>Protected content area</stx-text>
    </div>
  </stx-watermark>
</div>

```vue
<stx-watermark content="Stellux UI">
  <div style="height: 200px;">
    Protected content area
  </div>
</stx-watermark>
```

## Multi-line Watermark

<div class="demo-block">
  <stx-watermark :content="['Stellux UI', 'Confidential']">
    <div style="height: 200px; display: flex; align-items: center; justify-content: center;">
      <stx-text>Multi-line watermark content</stx-text>
    </div>
  </stx-watermark>
</div>

```vue
<stx-watermark :content="['Stellux UI', 'Confidential']">
  <div style="height: 200px;">
    Multi-line watermark content
  </div>
</stx-watermark>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| string[]` | — | Watermark text content |
| `width` | `number` | `120` | Watermark width |
| `height` | `number` | `64` | Watermark height |
| `rotate` | `number` | `-22` | Rotation angle in degrees |
| `zIndex` | `number` | `9` | Z-index of watermark layer |
| `image` | `string` | — | Image URL instead of text |
| `font` | `{ color, fontSize, fontFamily, fontWeight, fontStyle }` | — | Font configuration |
| `gap` | `[number, number]` | `[100, 100]` | Gap between watermarks |
| `offset` | `[number, number]` | — | Offset from top-left |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content to be watermarked |
