# Backtop

A button that scrolls the page back to the top when clicked.

## Basic Usage

```vue
<stx-backtop />
```

The button appears after scrolling down 200px by default.

## Custom Visibility Height

```vue
<stx-backtop :visibility-height="400" />
```

## Custom Position

```vue
<stx-backtop :right="100" :bottom="100" />
```

## Target Container

```vue
<stx-backtop target=".scroll-container" :visibility-height="100" />
```

## Custom Content

```vue
<stx-backtop>
  <stx-button type="primary" circle>Up</stx-button>
</stx-backtop>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visibilityHeight` | `number` | `200` | Scroll height to show the button |
| `target` | `string` | `''` | CSS selector of the scroll target |
| `right` | `number` | `40` | Distance from right edge in px |
| `bottom` | `number` | `40` | Distance from bottom edge in px |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `click` | `(event: MouseEvent)` | Triggered when button is clicked |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom button content |
