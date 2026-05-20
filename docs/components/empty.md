# Empty

Placeholder for empty states when no data is available.

## Basic Usage

<div class="demo-block">
  <stx-empty />
</div>

```vue
<stx-empty />
```

## Custom Description

<div class="demo-block">
  <stx-empty description="No search results found" />
</div>

```vue
<stx-empty description="No search results found" />
```

## Custom Content

<div class="demo-block">
  <stx-empty description="No data yet">
    <stx-button type="primary">Create Now</stx-button>
  </stx-empty>
</div>

```vue
<stx-empty description="No data yet">
  <stx-button type="primary">Create Now</stx-button>
</stx-empty>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `string` | — | Custom image URL |
| `imageSize` | `number` | — | Image display size |
| `description` | `string` | `'No Data'` | Description text |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom bottom content |
| `image` | Custom image content |
| `description` | Custom description content |
