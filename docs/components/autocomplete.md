# Autocomplete

Input field with real-time suggestions based on user input.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Autocomplete requires reactive data and fetch callback. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')

const suggestions = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
]

const querySearch = (query, cb) => {
  const results = query
    ? suggestions.filter(item => item.value.toLowerCase().includes(query.toLowerCase()))
    : suggestions
  cb(results)
}
</script>

<stx-autocomplete
  v-model="value"
  :fetch-suggestions="querySearch"
  placeholder="Type to search"
/>
```

## With Template

```vue
<stx-autocomplete v-model="value" :fetch-suggestions="querySearch" placeholder="Search">
  <template #default="{ item }">
    <span>{{ item.value }}</span>
  </template>
</stx-autocomplete>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string` | — | Binding value |
| `fetchSuggestions` | `(query: string, cb: Function) => void` | — | Fetch suggestions callback |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `clearable` | `boolean` | `false` | Show clear button |
| `valueKey` | `string` | `'value'` | Key name for display value |
| `debounce` | `number` | `300` | Debounce delay in ms |
| `triggerOnFocus` | `boolean` | `true` | Show on focus |
| `placement` | `'top' \| 'bottom'` | `'bottom'` | Suggestion placement |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Input size |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `select` | `(item: object)` | Suggestion selected |
| `change` | `(value: string)` | Input value changed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom suggestion item (receives `{ item }`) |
| `prefix` | Input prefix content |
| `suffix` | Input suffix content |
| `prepend` | Input prepend content |
| `append` | Input append content |
