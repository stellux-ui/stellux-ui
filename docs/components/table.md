# Table

Display structured data in rows and columns.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Table requires dynamic data binding. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: 'Alice', age: 28, email: 'alice@example.com' },
  { name: 'Bob', age: 32, email: 'bob@example.com' },
  { name: 'Charlie', age: 24, email: 'charlie@example.com' },
  { name: 'Diana', age: 35, email: 'diana@example.com' },
])
</script>

<stx-table :data="tableData">
  <stx-table-column prop="name" label="Name" />
  <stx-table-column prop="age" label="Age" width="80" />
  <stx-table-column prop="email" label="Email" />
</stx-table>
```

## Striped & Border

```vue
<stx-table :data="tableData" stripe border>
  <stx-table-column prop="name" label="Name" />
  <stx-table-column prop="age" label="Age" />
  <stx-table-column prop="email" label="Email" />
</stx-table>
```

## API

### Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<object>` | `[]` | Table data |
| `stripe` | `boolean` | `false` | Striped rows |
| `border` | `boolean` | `false` | Show borders |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Table size |
| `height` | `string \| number` | — | Table height (enables fixed header) |
| `maxHeight` | `string \| number` | — | Max table height |
| `showHeader` | `boolean` | `true` | Show table header |
| `highlightCurrentRow` | `boolean` | `false` | Highlight selected row |
| `emptyText` | `string` | `'No Data'` | Text when data is empty |
| `rowKey` | `string \| Function` | — | Row key for optimization |

### Table Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `row-click` | `(row, column, event)` | Row click |
| `sort-change` | `({ column, prop, order })` | Sort change |
| `selection-change` | `(selection: Array)` | Selection change |

### TableColumn Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop` | `string` | — | Field name in data |
| `label` | `string` | — | Column header text |
| `width` | `string \| number` | — | Column width |
| `minWidth` | `string \| number` | — | Minimum column width |
| `fixed` | `'left' \| 'right' \| boolean` | — | Fixed column position |
| `sortable` | `boolean \| 'custom'` | `false` | Enable sorting |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Column alignment |
| `type` | `'selection' \| 'index' \| 'expand'` | — | Special column type |

### TableColumn Slots

| Slot | Description |
|------|-------------|
| `default` | Custom column content (receives `{ row, column, $index }`) |
| `header` | Custom header content |
