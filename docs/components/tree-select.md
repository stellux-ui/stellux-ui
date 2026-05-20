# TreeSelect

A select component that displays options in a tree structure.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">TreeSelect requires dynamic data binding. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')

const treeData = ref([
  {
    value: 'dept-1',
    label: 'Engineering',
    children: [
      { value: 'team-1', label: 'Frontend' },
      { value: 'team-2', label: 'Backend' },
    ],
  },
  {
    value: 'dept-2',
    label: 'Design',
    children: [
      { value: 'team-3', label: 'UI/UX' },
      { value: 'team-4', label: 'Graphics' },
    ],
  },
])
</script>

<stx-tree-select v-model="value" :data="treeData" placeholder="Select department" />
```

## Multiple Selection

```vue
<script setup>
import { ref } from 'vue'
const values = ref([])
</script>

<stx-tree-select v-model="values" :data="treeData" multiple placeholder="Select teams" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string \| number \| Array` | — | Binding value |
| `data` | `Array<object>` | `[]` | Tree data |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `placeholder` | `string` | `'Select'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `clearable` | `boolean` | `false` | Show clear button |
| `showCheckbox` | `boolean` | `false` | Show checkboxes |
| `checkStrictly` | `boolean` | `false` | Check nodes independently |
| `filterable` | `boolean` | `false` | Enable search filtering |
| `props` | `object` | `{ children, label, value }` | Map data fields |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value)` | Selected value changed |
| `node-click` | `(data, node)` | Tree node clicked |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom option content (receives `{ node, data }`) |
