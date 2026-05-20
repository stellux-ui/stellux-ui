# Link

Text hyperlink component with type styling.

## Basic Usage

<div class="demo-block">
  <stx-link href="https://example.com">Default</stx-link>
  <stx-link type="primary">Primary</stx-link>
  <stx-link type="success">Success</stx-link>
  <stx-link type="warning">Warning</stx-link>
  <stx-link type="danger">Danger</stx-link>
  <stx-link type="info">Info</stx-link>
</div>

```vue
<stx-link href="https://example.com">Default</stx-link>
<stx-link type="primary">Primary</stx-link>
<stx-link type="success">Success</stx-link>
<stx-link type="warning">Warning</stx-link>
<stx-link type="danger">Danger</stx-link>
<stx-link type="info">Info</stx-link>
```

## Disabled

<div class="demo-block">
  <stx-link disabled>Default</stx-link>
  <stx-link type="primary" disabled>Primary</stx-link>
  <stx-link type="success" disabled>Success</stx-link>
  <stx-link type="danger" disabled>Danger</stx-link>
</div>

```vue
<stx-link disabled>Default</stx-link>
<stx-link type="primary" disabled>Primary</stx-link>
```

## Underline

<div class="demo-block">
  <stx-link type="primary">With Underline</stx-link>
  <stx-link type="primary" :underline="false">Without Underline</stx-link>
</div>

```vue
<stx-link type="primary">With Underline</stx-link>
<stx-link type="primary" :underline="false">Without Underline</stx-link>
```

## With Href

<div class="demo-block">
  <stx-link type="primary" href="https://example.com" target="_blank">External Link</stx-link>
  <stx-link type="success" href="https://example.com">Same Tab</stx-link>
</div>

```vue
<stx-link type="primary" href="https://example.com" target="_blank">External Link</stx-link>
<stx-link type="success" href="https://example.com">Same Tab</stx-link>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Link type |
| `underline` | `boolean` | `true` | Show underline on hover |
| `disabled` | `boolean` | `false` | Disabled state |
| `href` | `string` | `''` | Native href attribute |
| `target` | `string` | `'_self'` | Native target attribute |
| `icon` | `Component` | — | Icon component |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `click` | `(event: MouseEvent)` | Triggered on click |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Link content |
| `icon` | Custom icon |
