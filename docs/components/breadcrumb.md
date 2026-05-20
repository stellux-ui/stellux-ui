# Breadcrumb

Display the current page path as a hierarchy of links.

## Basic Usage

<div class="demo-block">
  <stx-breadcrumb>
    <stx-breadcrumb-item to="/">Home</stx-breadcrumb-item>
    <stx-breadcrumb-item to="/components">Components</stx-breadcrumb-item>
    <stx-breadcrumb-item>Breadcrumb</stx-breadcrumb-item>
  </stx-breadcrumb>
</div>

```vue
<stx-breadcrumb>
  <stx-breadcrumb-item to="/">Home</stx-breadcrumb-item>
  <stx-breadcrumb-item to="/components">Components</stx-breadcrumb-item>
  <stx-breadcrumb-item>Breadcrumb</stx-breadcrumb-item>
</stx-breadcrumb>
```

## Custom Separator

<div class="demo-block">
  <stx-breadcrumb separator=">">
    <stx-breadcrumb-item to="/">Home</stx-breadcrumb-item>
    <stx-breadcrumb-item to="/components">Components</stx-breadcrumb-item>
    <stx-breadcrumb-item>Breadcrumb</stx-breadcrumb-item>
  </stx-breadcrumb>
</div>

```vue
<stx-breadcrumb separator=">">
  <stx-breadcrumb-item to="/">Home</stx-breadcrumb-item>
  <stx-breadcrumb-item to="/components">Components</stx-breadcrumb-item>
  <stx-breadcrumb-item>Breadcrumb</stx-breadcrumb-item>
</stx-breadcrumb>
```

## Deeper Path

<div class="demo-block">
  <stx-breadcrumb>
    <stx-breadcrumb-item to="/">Home</stx-breadcrumb-item>
    <stx-breadcrumb-item to="/products">Products</stx-breadcrumb-item>
    <stx-breadcrumb-item to="/products/electronics">Electronics</stx-breadcrumb-item>
    <stx-breadcrumb-item>Laptops</stx-breadcrumb-item>
  </stx-breadcrumb>
</div>

```vue
<stx-breadcrumb>
  <stx-breadcrumb-item to="/">Home</stx-breadcrumb-item>
  <stx-breadcrumb-item to="/products">Products</stx-breadcrumb-item>
  <stx-breadcrumb-item to="/products/electronics">Electronics</stx-breadcrumb-item>
  <stx-breadcrumb-item>Laptops</stx-breadcrumb-item>
</stx-breadcrumb>
```

## API

### Breadcrumb Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `separator` | `string` | `'/'` | Separator character |
| `separatorIcon` | `Component` | -- | Separator icon component |

### Breadcrumb Slots

| Slot | Description |
|------|-------------|
| `default` | Breadcrumb items |

### BreadcrumbItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `to` | `string \| object` | `''` | Route link target |
| `replace` | `boolean` | `false` | Use router.replace instead of router.push |

### BreadcrumbItem Slots

| Slot | Description |
|------|-------------|
| `default` | Item content |
