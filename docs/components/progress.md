# Progress

Display the current completion progress of an operation.

## Basic Usage

<div class="demo-block" style="flex-direction: column; gap: 16px; width: 100%;">
  <stx-progress :percentage="20" />
  <stx-progress :percentage="50" />
  <stx-progress :percentage="80" />
  <stx-progress :percentage="100" />
</div>

```vue
<stx-progress :percentage="20" />
<stx-progress :percentage="50" />
<stx-progress :percentage="80" />
<stx-progress :percentage="100" />
```

## Status Colors

<div class="demo-block" style="flex-direction: column; gap: 16px; width: 100%;">
  <stx-progress :percentage="100" status="success" />
  <stx-progress :percentage="70" status="warning" />
  <stx-progress :percentage="50" status="exception" />
</div>

```vue
<stx-progress :percentage="100" status="success" />
<stx-progress :percentage="70" status="warning" />
<stx-progress :percentage="50" status="exception" />
```

## Show Text Inside

<div class="demo-block" style="flex-direction: column; gap: 16px; width: 100%;">
  <stx-progress :percentage="60" :stroke-width="20" text-inside />
  <stx-progress :percentage="80" :stroke-width="20" text-inside status="success" />
</div>

```vue
<stx-progress :percentage="60" :stroke-width="20" text-inside />
<stx-progress :percentage="80" :stroke-width="20" text-inside status="success" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percentage` | `number` | `0` | Percentage value (0-100) |
| `type` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | Progress type |
| `strokeWidth` | `number` | `6` | Progress bar width in px |
| `textInside` | `boolean` | `false` | Show text inside progress bar |
| `status` | `'success' \| 'warning' \| 'exception'` | — | Current status |
| `color` | `string \| Array \| Function` | — | Custom bar color |
| `showText` | `boolean` | `true` | Show percentage text |
| `format` | `(percentage: number) => string` | — | Custom text format |
| `striped` | `boolean` | `false` | Striped bar style |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom text content (receives `{ percentage }`) |
