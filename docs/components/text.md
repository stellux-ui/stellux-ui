# Text

Text component for common text styling with type and size variants.

## Basic Usage

<div class="demo-block">
  <stx-text>Default</stx-text>
  <stx-text type="primary">Primary</stx-text>
  <stx-text type="success">Success</stx-text>
  <stx-text type="warning">Warning</stx-text>
  <stx-text type="danger">Danger</stx-text>
  <stx-text type="info">Info</stx-text>
</div>

```vue
<stx-text>Default</stx-text>
<stx-text type="primary">Primary</stx-text>
<stx-text type="success">Success</stx-text>
<stx-text type="warning">Warning</stx-text>
<stx-text type="danger">Danger</stx-text>
<stx-text type="info">Info</stx-text>
```

## Sizes

<div class="demo-block">
  <stx-text size="small">Small</stx-text>
  <stx-text>Default</stx-text>
  <stx-text size="large">Large</stx-text>
</div>

```vue
<stx-text size="small">Small</stx-text>
<stx-text>Default</stx-text>
<stx-text size="large">Large</stx-text>
```

## Truncated

<div class="demo-block" style="flex-direction: column; max-width: 300px;">
  <stx-text truncated>This is a very long text that should be truncated when it overflows the container width</stx-text>
</div>

```vue
<stx-text truncated>
  This is a very long text that should be truncated when it overflows...
</stx-text>
```

## Line Clamp

<div class="demo-block" style="flex-direction: column; max-width: 300px;">
  <stx-text :line-clamp="2">This is a long paragraph that will be clamped to two lines. When the text exceeds two lines it will show an ellipsis at the end of the second line to indicate more content exists.</stx-text>
</div>

```vue
<stx-text :line-clamp="2">
  This is a long paragraph that will be clamped to two lines...
</stx-text>
```

## Custom Tag

<div class="demo-block">
  <stx-text tag="p" type="primary">Rendered as p</stx-text>
  <stx-text tag="b" type="danger">Rendered as b</stx-text>
  <stx-text tag="i" type="info">Rendered as i</stx-text>
</div>

```vue
<stx-text tag="p" type="primary">Rendered as p</stx-text>
<stx-text tag="b" type="danger">Rendered as b</stx-text>
<stx-text tag="i" type="info">Rendered as i</stx-text>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `''` | Text type |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Text size |
| `tag` | `string` | `'span'` | Custom HTML tag |
| `truncated` | `boolean` | `false` | Truncate text with ellipsis |
| `lineClamp` | `string \| number` | — | Max lines before clamping |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Text content |
