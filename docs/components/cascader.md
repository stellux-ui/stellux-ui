# Cascader

Select from a hierarchical set of options with multi-level drill-down.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Cascader requires reactive data binding. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const value = ref([])

const options = ref([
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      { value: 'vue', label: 'Vue' },
      { value: 'react', label: 'React' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend',
    children: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
    ],
  },
])
</script>

<stx-cascader v-model="value" :options="options" placeholder="Select technology" />
```

## Filterable

```vue
<stx-cascader v-model="value" :options="options" filterable placeholder="Search and select" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `Array` | — | Selected value path |
| `options` | `Array<{ value, label, children?, disabled? }>` | `[]` | Cascading options |
| `placeholder` | `string` | `'Select'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `clearable` | `boolean` | `false` | Show clear button |
| `filterable` | `boolean` | `false` | Enable search filtering |
| `showAllLevels` | `boolean` | `true` | Show full path in input |
| `separator` | `string` | `' / '` | Path separator |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Component size |
| `props` | `object` | — | Configuration for data mapping |
| `collapseTags` | `boolean` | `false` | Collapse tags in multiple mode |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: Array)` | Selected value changed |
| `expandChange` | `(value: Array)` | Expanded nodes changed |
| `blur` | `(event: FocusEvent)` | Input blurred |
| `focus` | `(event: FocusEvent)` | Input focused |
| `visible-change` | `(visible: boolean)` | Panel visibility changed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom option content (receives `{ node, data }`) |
| `empty` | Empty state content |
