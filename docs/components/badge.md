# Badge

Display a badge indicator over its child element.

## Basic Usage

<div class="demo-block" style="gap: 32px;">
  <stx-badge :value="12">
    <stx-button>Comments</stx-button>
  </stx-badge>
  <stx-badge :value="3">
    <stx-button>Replies</stx-button>
  </stx-badge>
  <stx-badge :value="1" type="primary">
    <stx-button>Messages</stx-button>
  </stx-badge>
</div>

```vue
<stx-badge :value="12">
  <stx-button>Comments</stx-button>
</stx-badge>
<stx-badge :value="3">
  <stx-button>Replies</stx-button>
</stx-badge>
```

## Max Value

<div class="demo-block" style="gap: 32px;">
  <stx-badge :value="200" :max="99">
    <stx-button>Comments</stx-button>
  </stx-badge>
  <stx-badge :value="50" :max="10">
    <stx-button>Replies</stx-button>
  </stx-badge>
</div>

```vue
<stx-badge :value="200" :max="99">
  <stx-button>Comments</stx-button>
</stx-badge>
<stx-badge :value="50" :max="10">
  <stx-button>Replies</stx-button>
</stx-badge>
```

## Dot

<div class="demo-block" style="gap: 32px;">
  <stx-badge is-dot>
    <stx-button>Notifications</stx-button>
  </stx-badge>
  <stx-badge is-dot type="primary">
    <stx-button>Messages</stx-button>
  </stx-badge>
</div>

```vue
<stx-badge is-dot>
  <stx-button>Notifications</stx-button>
</stx-badge>
```

## Types

<div class="demo-block" style="gap: 32px;">
  <stx-badge :value="5" type="primary">
    <stx-button>Primary</stx-button>
  </stx-badge>
  <stx-badge :value="10" type="success">
    <stx-button>Success</stx-button>
  </stx-badge>
  <stx-badge :value="8" type="warning">
    <stx-button>Warning</stx-button>
  </stx-badge>
  <stx-badge :value="12" type="danger">
    <stx-button>Danger</stx-button>
  </stx-badge>
  <stx-badge :value="3" type="info">
    <stx-button>Info</stx-button>
  </stx-badge>
</div>

```vue
<stx-badge :value="5" type="primary">
  <stx-button>Primary</stx-button>
</stx-badge>
<stx-badge :value="10" type="success">
  <stx-button>Success</stx-button>
</stx-badge>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | `''` | Display value |
| `max` | `number` | `99` | Max value; shows `{max}+` when exceeded |
| `isDot` | `boolean` | `false` | Show as a dot |
| `hidden` | `boolean` | `false` | Hide the badge |
| `type` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` | Badge type |
| `showZero` | `boolean` | `true` | Show badge when value is zero |
| `color` | `string` | `''` | Custom background color |
| `offset` | `[number, number]` | — | Offset `[x, y]` in pixels |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content the badge wraps around |
