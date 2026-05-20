# Descriptions

Display structured key-value pair information in a list format.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-descriptions title="User Info">
    <stx-descriptions-item label="Name">John Doe</stx-descriptions-item>
    <stx-descriptions-item label="Email">john@example.com</stx-descriptions-item>
    <stx-descriptions-item label="Phone">+1 234 567 890</stx-descriptions-item>
    <stx-descriptions-item label="Location">New York, USA</stx-descriptions-item>
    <stx-descriptions-item label="Role">Administrator</stx-descriptions-item>
  </stx-descriptions>
</div>

```vue
<stx-descriptions title="User Info">
  <stx-descriptions-item label="Name">John Doe</stx-descriptions-item>
  <stx-descriptions-item label="Email">john@example.com</stx-descriptions-item>
  <stx-descriptions-item label="Phone">+1 234 567 890</stx-descriptions-item>
  <stx-descriptions-item label="Location">New York, USA</stx-descriptions-item>
  <stx-descriptions-item label="Role">Administrator</stx-descriptions-item>
</stx-descriptions>
```

## Bordered

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-descriptions title="Order Details" border>
    <stx-descriptions-item label="Order ID">ORD-20240001</stx-descriptions-item>
    <stx-descriptions-item label="Status">Shipped</stx-descriptions-item>
    <stx-descriptions-item label="Amount">$128.00</stx-descriptions-item>
    <stx-descriptions-item label="Date">2024-01-15</stx-descriptions-item>
  </stx-descriptions>
</div>

```vue
<stx-descriptions title="Order Details" border>
  <stx-descriptions-item label="Order ID">ORD-20240001</stx-descriptions-item>
  <stx-descriptions-item label="Status">Shipped</stx-descriptions-item>
  <stx-descriptions-item label="Amount">$128.00</stx-descriptions-item>
  <stx-descriptions-item label="Date">2024-01-15</stx-descriptions-item>
</stx-descriptions>
```

## API

### Descriptions Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Title text |
| `border` | `boolean` | `false` | Show border |
| `column` | `number` | `3` | Number of columns |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Size of the list |

### Descriptions Slots

| Slot | Description |
|------|-------------|
| `default` | Description items |
| `title` | Custom title content |
| `extra` | Extra action area |

### DescriptionsItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `span` | `number` | `1` | Column span |
