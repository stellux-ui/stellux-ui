# Anchor

A navigation component that links to sections within the page with scroll tracking.

## Basic Usage

<div class="demo-block" style="flex-direction: column;">
  <stx-anchor>
    <stx-anchor-link href="#basic-usage" title="Basic Usage" />
    <stx-anchor-link href="#underline-type" title="Underline Type" />
    <stx-anchor-link href="#horizontal" title="Horizontal" />
    <stx-anchor-link href="#api" title="API" />
  </stx-anchor>
</div>

```vue
<stx-anchor>
  <stx-anchor-link href="#section-1" title="Section 1" />
  <stx-anchor-link href="#section-2" title="Section 2" />
  <stx-anchor-link href="#section-3" title="Section 3" />
</stx-anchor>
```

## Underline Type

<div class="demo-block" style="flex-direction: column;">
  <stx-anchor type="underline">
    <stx-anchor-link href="#basic-usage" title="Basic Usage" />
    <stx-anchor-link href="#underline-type" title="Underline Type" />
    <stx-anchor-link href="#api" title="API" />
  </stx-anchor>
</div>

```vue
<stx-anchor type="underline">
  <stx-anchor-link href="#section-1" title="Section 1" />
  <stx-anchor-link href="#section-2" title="Section 2" />
</stx-anchor>
```

## Horizontal

<div class="demo-block">
  <stx-anchor direction="horizontal">
    <stx-anchor-link href="#basic-usage" title="Basic Usage" />
    <stx-anchor-link href="#underline-type" title="Underline Type" />
    <stx-anchor-link href="#horizontal" title="Horizontal" />
  </stx-anchor>
</div>

```vue
<stx-anchor direction="horizontal">
  <stx-anchor-link href="#section-1" title="Section 1" />
  <stx-anchor-link href="#section-2" title="Section 2" />
</stx-anchor>
```

## Without Marker

```vue
<stx-anchor :marker="false">
  <stx-anchor-link href="#section-1" title="Section 1" />
  <stx-anchor-link href="#section-2" title="Section 2" />
</stx-anchor>
```

## API

### Anchor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `string \| HTMLElement \| Window` | -- | Scroll container |
| `offset` | `number` | `0` | Offset for scroll position detection |
| `bound` | `number` | `15` | Boundary tolerance in px |
| `duration` | `number` | `300` | Scroll animation duration in ms |
| `marker` | `boolean` | `true` | Show active link marker |
| `type` | `'default' \| 'underline'` | `'default'` | Visual style type |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |

### Anchor Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(href: string)` | Triggered when active link changes |
| `click` | `(event: MouseEvent, href: string)` | Triggered when a link is clicked |

### Anchor Slots

| Slot | Description |
|------|-------------|
| `default` | Anchor link components |

### AnchorLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `''` | Target anchor ID (with #) |
| `title` | `string` | `''` | Link display text |

### AnchorLink Slots

| Slot | Description |
|------|-------------|
| `default` | Nested anchor links (sub-links) |
