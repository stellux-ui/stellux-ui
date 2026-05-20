# Tag

Mark and categorize content with colored labels.

## Basic Usage

<div class="demo-block">
  <stx-tag>Default</stx-tag>
  <stx-tag type="primary">Primary</stx-tag>
  <stx-tag type="success">Success</stx-tag>
  <stx-tag type="warning">Warning</stx-tag>
  <stx-tag type="danger">Danger</stx-tag>
  <stx-tag type="info">Info</stx-tag>
</div>

```vue
<stx-tag>Default</stx-tag>
<stx-tag type="primary">Primary</stx-tag>
<stx-tag type="success">Success</stx-tag>
<stx-tag type="warning">Warning</stx-tag>
<stx-tag type="danger">Danger</stx-tag>
<stx-tag type="info">Info</stx-tag>
```

## Effects

<div class="demo-block" style="flex-direction: column; gap: 12px;">
  <div style="display: flex; gap: 8px;">
    <stx-tag effect="dark" type="primary">Dark</stx-tag>
    <stx-tag effect="dark" type="success">Dark</stx-tag>
    <stx-tag effect="dark" type="warning">Dark</stx-tag>
    <stx-tag effect="dark" type="danger">Dark</stx-tag>
    <stx-tag effect="dark" type="info">Dark</stx-tag>
  </div>
  <div style="display: flex; gap: 8px;">
    <stx-tag effect="light" type="primary">Light</stx-tag>
    <stx-tag effect="light" type="success">Light</stx-tag>
    <stx-tag effect="light" type="warning">Light</stx-tag>
    <stx-tag effect="light" type="danger">Light</stx-tag>
    <stx-tag effect="light" type="info">Light</stx-tag>
  </div>
  <div style="display: flex; gap: 8px;">
    <stx-tag effect="plain" type="primary">Plain</stx-tag>
    <stx-tag effect="plain" type="success">Plain</stx-tag>
    <stx-tag effect="plain" type="warning">Plain</stx-tag>
    <stx-tag effect="plain" type="danger">Plain</stx-tag>
    <stx-tag effect="plain" type="info">Plain</stx-tag>
  </div>
</div>

```vue
<stx-tag effect="dark" type="primary">Dark</stx-tag>
<stx-tag effect="light" type="primary">Light</stx-tag>
<stx-tag effect="plain" type="primary">Plain</stx-tag>
```

## Sizes

<div class="demo-block">
  <stx-tag type="primary" size="small">Small</stx-tag>
  <stx-tag type="primary">Default</stx-tag>
  <stx-tag type="primary" size="large">Large</stx-tag>
</div>

```vue
<stx-tag type="primary" size="small">Small</stx-tag>
<stx-tag type="primary">Default</stx-tag>
<stx-tag type="primary" size="large">Large</stx-tag>
```

## Closable

<div class="demo-block">
  <stx-tag closable type="primary">Primary</stx-tag>
  <stx-tag closable type="success">Success</stx-tag>
  <stx-tag closable type="warning">Warning</stx-tag>
  <stx-tag closable type="danger">Danger</stx-tag>
</div>

```vue
<stx-tag closable type="primary">Primary</stx-tag>
<stx-tag closable type="success">Success</stx-tag>
```

## Round

<div class="demo-block">
  <stx-tag round type="primary">Primary</stx-tag>
  <stx-tag round type="success">Success</stx-tag>
  <stx-tag round type="warning">Warning</stx-tag>
  <stx-tag round type="danger">Danger</stx-tag>
  <stx-tag round type="info">Info</stx-tag>
</div>

```vue
<stx-tag round type="primary">Primary</stx-tag>
<stx-tag round type="success">Success</stx-tag>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `''` | Tag type |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Tag size |
| `closable` | `boolean` | `false` | Show close button |
| `disableTransitions` | `boolean` | `false` | Disable transitions |
| `hit` | `boolean` | `false` | Show border highlight |
| `color` | `string` | `''` | Custom background color |
| `effect` | `'dark' \| 'light' \| 'plain'` | `'light'` | Tag theme |
| `round` | `boolean` | `false` | Round border radius |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `click` | `(event: MouseEvent)` | Triggered on click |
| `close` | `(event: MouseEvent)` | Triggered on close button click |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Tag content |
