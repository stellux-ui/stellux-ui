# Skeleton

Display placeholder loading content before real data is loaded.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-skeleton />
</div>

```vue
<stx-skeleton />
```

## Animated

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-skeleton animated />
</div>

```vue
<stx-skeleton animated />
```

## Custom Rows

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-skeleton :rows="5" animated />
</div>

```vue
<stx-skeleton :rows="5" animated />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `true` | Show skeleton when true |
| `animated` | `boolean` | `false` | Enable animation effect |
| `rows` | `number` | `3` | Number of skeleton rows |
| `throttle` | `number` | `0` | Throttle delay in ms |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Real content shown when loading is false |
| `template` | Custom skeleton template |
