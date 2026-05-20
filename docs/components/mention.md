# Mention

Input component with mention (@) suggestions for referencing users or entities.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Mention requires reactive data and options. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')

const options = ref([
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'charlie', label: 'Charlie' },
  { value: 'diana', label: 'Diana' },
])
</script>

<stx-mention v-model="value" :options="options" placeholder="Type @ to mention someone" />
```

## Custom Trigger

```vue
<stx-mention v-model="value" :options="options" prefix="#" placeholder="Type # to tag" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string` | — | Binding value |
| `options` | `Array<{ value, label }>` | `[]` | Mention options |
| `prefix` | `string \| string[]` | `'@'` | Trigger character(s) |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `filterOption` | `Function` | — | Custom filter function |
| `placement` | `'top' \| 'bottom'` | `'bottom'` | Suggestion placement |
| `loading` | `boolean` | `false` | Loading state |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `select` | `(option: object)` | Option selected |
| `change` | `(value: string)` | Input value changed |
| `search` | `(pattern: string, prefix: string)` | Search triggered |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom option content (receives `{ option }`) |
| `label` | Custom label in input |
