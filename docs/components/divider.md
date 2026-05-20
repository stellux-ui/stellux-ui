# Divider

Separating line between content sections.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <span>Content above</span>
  <stx-divider />
  <span>Content below</span>
</div>

```vue
<span>Content above</span>
<stx-divider />
<span>Content below</span>
```

## With Text

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-divider>Center Text</stx-divider>
  <stx-divider content-position="left">Left Text</stx-divider>
  <stx-divider content-position="right">Right Text</stx-divider>
</div>

```vue
<stx-divider>Center Text</stx-divider>
<stx-divider content-position="left">Left Text</stx-divider>
<stx-divider content-position="right">Right Text</stx-divider>
```

## Dashed

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-divider border-style="dashed" />
  <stx-divider border-style="dashed">Dashed with Text</stx-divider>
</div>

```vue
<stx-divider border-style="dashed" />
<stx-divider border-style="dashed">Dashed with Text</stx-divider>
```

## Vertical

<div class="demo-block">
  <span>Left</span>
  <stx-divider direction="vertical" />
  <span>Center</span>
  <stx-divider direction="vertical" />
  <span>Right</span>
</div>

```vue
<span>Left</span>
<stx-divider direction="vertical" />
<span>Center</span>
<stx-divider direction="vertical" />
<span>Right</span>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
| `contentPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Position of text content |
| `borderStyle` | `string` | `'solid'` | CSS border-style value |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Divider text content |
