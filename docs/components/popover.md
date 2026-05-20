# Popover

Display rich content in a floating popup attached to a trigger element.

## Basic Usage

<div class="demo-block" style="gap: 16px;">
  <stx-popover title="Title" content="This is the popover content." :width="200">
    <template #reference>
      <stx-button>Click to activate</stx-button>
    </template>
  </stx-popover>
</div>

```vue
<stx-popover title="Title" content="This is the popover content." :width="200">
  <template #reference>
    <stx-button>Click to activate</stx-button>
  </template>
</stx-popover>
```

## Hover Trigger

<div class="demo-block" style="gap: 16px;">
  <stx-popover title="Hover Title" content="This popover appears on hover." trigger="hover" :width="200">
    <template #reference>
      <stx-button type="primary">Hover me</stx-button>
    </template>
  </stx-popover>
</div>

```vue
<stx-popover
  title="Hover Title"
  content="This popover appears on hover."
  trigger="hover"
  :width="200"
>
  <template #reference>
    <stx-button type="primary">Hover me</stx-button>
  </template>
</stx-popover>
```

## Placements

<div class="demo-block" style="gap: 16px;">
  <stx-popover content="Top placement" placement="top" :width="160">
    <template #reference>
      <stx-button>Top</stx-button>
    </template>
  </stx-popover>
  <stx-popover content="Bottom placement" placement="bottom" :width="160">
    <template #reference>
      <stx-button>Bottom</stx-button>
    </template>
  </stx-popover>
  <stx-popover content="Left placement" placement="left" :width="160">
    <template #reference>
      <stx-button>Left</stx-button>
    </template>
  </stx-popover>
  <stx-popover content="Right placement" placement="right" :width="160">
    <template #reference>
      <stx-button>Right</stx-button>
    </template>
  </stx-popover>
</div>

```vue
<stx-popover content="Top placement" placement="top" :width="160">
  <template #reference>
    <stx-button>Top</stx-button>
  </template>
</stx-popover>
```

## Custom Content

<div class="demo-block">
  <stx-popover :width="240">
    <template #reference>
      <stx-button type="primary">Custom Content</stx-button>
    </template>
    <p style="margin: 0 0 8px;">This popover uses a custom slot for content.</p>
    <stx-button type="primary" size="small">Action</stx-button>
  </stx-popover>
</div>

```vue
<stx-popover :width="240">
  <template #reference>
    <stx-button type="primary">Custom Content</stx-button>
  </template>
  <p>This popover uses a custom slot for content.</p>
  <stx-button type="primary" size="small">Action</stx-button>
</stx-popover>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Popover title |
| `width` | `string \| number` | `150` | Popover width |
| `content` | `string` | `''` | Popover content text |
| `rawContent` | `boolean` | `false` | Render content as raw HTML |
| `placement` | `Placement` | `'bottom'` | Popover position |
| `visible` | `boolean` | — | Manual visibility control |
| `disabled` | `boolean` | `false` | Disable the popover |
| `offset` | `number` | `12` | Offset from reference element |
| `transition` | `string` | `'stx-fade-in-linear'` | CSS transition name |
| `showArrow` | `boolean` | `true` | Show popover arrow |
| `showAfter` | `number` | `0` | Delay before showing (ms) |
| `hideAfter` | `number` | `200` | Delay before hiding (ms) |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'contextmenu'` | `'click'` | Trigger mode |
| `enterable` | `boolean` | `true` | Allow mouse to enter popover |
| `popperClass` | `string` | `''` | Custom class for popover |
| `teleported` | `boolean` | `true` | Teleport to body |
| `persistent` | `boolean` | `true` | Keep in DOM when hidden |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `update:visible` | `(value: boolean)` | Visibility change |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Popover body content |
| `reference` | Trigger element |
