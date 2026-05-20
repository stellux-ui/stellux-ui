# PageHeader

A header bar with a back button, title, and optional content area.

## Basic Usage

<div class="demo-block" style="flex-direction: column;">
  <stx-page-header title="Back" content="Page Title" />
</div>

```vue
<stx-page-header title="Back" content="Page Title" />
```

## Custom Title

<div class="demo-block" style="flex-direction: column;">
  <stx-page-header title="Return to List" content="User Detail Page" />
</div>

```vue
<stx-page-header title="Return to List" content="User Detail Page" />
```

## With Slot Content

<div class="demo-block" style="flex-direction: column;">
  <stx-page-header content="Order Management">
    <template #extra>
      <stx-button type="primary">Create Order</stx-button>
    </template>
  </stx-page-header>
</div>

```vue
<stx-page-header content="Order Management">
  <template #extra>
    <stx-button type="primary">Create Order</stx-button>
  </template>
</stx-page-header>
```

## With Body Content

```vue
<script setup>
function goBack() {
  console.log('go back')
}
</script>

<stx-page-header @back="goBack" content="Settings">
  <p>Configure your account preferences below.</p>
</stx-page-header>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Back'` | Back button text |
| `icon` | `Component` | -- | Custom back icon |
| `content` | `string` | `''` | Header content text |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `back` | `(event: MouseEvent)` | Triggered when back button is clicked |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Body content below the header |
| `title` | Custom back button content |
| `content` | Custom header content |
| `extra` | Extra content on the right side |
