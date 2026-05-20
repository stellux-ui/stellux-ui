# Popconfirm

A confirmation popover that appears when clicking the trigger element.

## Basic Usage

<div class="demo-block">
  <stx-popconfirm title="Are you sure you want to delete this?">
    <template #reference>
      <stx-button type="danger">Delete</stx-button>
    </template>
  </stx-popconfirm>
</div>

```vue
<stx-popconfirm title="Are you sure you want to delete this?">
  <template #reference>
    <stx-button type="danger">Delete</stx-button>
  </template>
</stx-popconfirm>
```

## Custom Button Text

<div class="demo-block">
  <stx-popconfirm
    title="Save changes before leaving?"
    confirm-button-text="Save"
    cancel-button-text="Discard"
  >
    <template #reference>
      <stx-button type="primary">Leave Page</stx-button>
    </template>
  </stx-popconfirm>
</div>

```vue
<stx-popconfirm
  title="Save changes before leaving?"
  confirm-button-text="Save"
  cancel-button-text="Discard"
>
  <template #reference>
    <stx-button type="primary">Leave Page</stx-button>
  </template>
</stx-popconfirm>
```

## Button Types

<div class="demo-block">
  <stx-popconfirm
    title="Remove this item?"
    confirm-button-type="danger"
    cancel-button-type="default"
    confirm-button-text="Remove"
    cancel-button-text="Keep"
  >
    <template #reference>
      <stx-button>Remove Item</stx-button>
    </template>
  </stx-popconfirm>
</div>

```vue
<stx-popconfirm
  title="Remove this item?"
  confirm-button-type="danger"
  cancel-button-type="default"
  confirm-button-text="Remove"
  cancel-button-text="Keep"
>
  <template #reference>
    <stx-button>Remove Item</stx-button>
  </template>
</stx-popconfirm>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Confirmation message |
| `confirmButtonText` | `string` | `'Yes'` | Confirm button text |
| `cancelButtonText` | `string` | `'No'` | Cancel button text |
| `confirmButtonType` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Confirm button type |
| `cancelButtonType` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` | Cancel button type |
| `icon` | `Component` | -- | Custom icon |
| `iconColor` | `string` | `'var(--stx-color-warning)'` | Icon color |
| `hideIcon` | `boolean` | `false` | Hide the icon |
| `hideAfter` | `number` | `200` | Delay before hiding (ms) |
| `teleported` | `boolean` | `true` | Teleport popover to body |
| `persistent` | `boolean` | `true` | Keep popover in DOM when hidden |
| `width` | `string \| number` | `150` | Popover width |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `confirm` | -- | Triggered when confirm button is clicked |
| `cancel` | -- | Triggered when cancel button is clicked |

### Slots

| Slot | Description |
|------|-------------|
| `reference` | Trigger element |
