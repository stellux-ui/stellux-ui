# Transfer

Move items between two panels for selection management.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Transfer requires reactive data binding. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const data = ref([
  { key: 1, label: 'Option 1' },
  { key: 2, label: 'Option 2' },
  { key: 3, label: 'Option 3' },
  { key: 4, label: 'Option 4' },
  { key: 5, label: 'Option 5' },
  { key: 6, label: 'Option 6' },
])

const value = ref([1, 4])
</script>

<stx-transfer v-model="value" :data="data" />
```

## Filterable

```vue
<stx-transfer v-model="value" :data="data" filterable filter-placeholder="Search" />
```

## Custom Titles

```vue
<stx-transfer v-model="value" :data="data" :titles="['Available', 'Selected']" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `Array` | `[]` | Selected keys (right panel) |
| `data` | `Array<{ key, label, disabled? }>` | `[]` | Data source |
| `filterable` | `boolean` | `false` | Enable filtering |
| `filterPlaceholder` | `string` | `'Enter keyword'` | Filter input placeholder |
| `filterMethod` | `Function` | — | Custom filter function |
| `titles` | `string[]` | `['List 1', 'List 2']` | Panel titles |
| `buttonTexts` | `string[]` | `[]` | Transfer button texts |
| `props` | `object` | `{ key, label, disabled }` | Map data fields |
| `targetOrder` | `'original' \| 'push' \| 'unshift'` | `'original'` | Right panel order |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value, direction, movedKeys)` | Selection changed |
| `left-check-change` | `(checked, allChecked)` | Left panel check changed |
| `right-check-change` | `(checked, allChecked)` | Right panel check changed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom item content (receives `{ option }`) |
| `left-footer` | Left panel footer |
| `right-footer` | Right panel footer |
