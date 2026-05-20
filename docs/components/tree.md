# Tree

Display hierarchical data in a tree structure with expand/collapse support.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Tree requires dynamic data binding. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const treeData = ref([
  {
    label: 'Level 1 - Node 1',
    children: [
      { label: 'Level 2 - Node 1-1' },
      { label: 'Level 2 - Node 1-2', children: [
        { label: 'Level 3 - Node 1-2-1' },
      ]},
    ],
  },
  {
    label: 'Level 1 - Node 2',
    children: [
      { label: 'Level 2 - Node 2-1' },
      { label: 'Level 2 - Node 2-2' },
    ],
  },
])
</script>

<stx-tree :data="treeData" default-expand-all />
```

## With Checkboxes

```vue
<stx-tree :data="treeData" show-checkbox default-expand-all />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<object>` | `[]` | Tree data |
| `props` | `object` | `{ children: 'children', label: 'label' }` | Map data fields |
| `nodeKey` | `string` | — | Unique identifier field |
| `showCheckbox` | `boolean` | `false` | Show checkboxes |
| `defaultExpandAll` | `boolean` | `false` | Expand all nodes |
| `defaultExpandedKeys` | `Array` | — | Default expanded node keys |
| `defaultCheckedKeys` | `Array` | — | Default checked node keys |
| `accordion` | `boolean` | `false` | Accordion mode |
| `draggable` | `boolean` | `false` | Enable drag-and-drop |
| `lazy` | `boolean` | `false` | Enable lazy loading |
| `load` | `Function` | — | Lazy load function |
| `highlightCurrent` | `boolean` | `false` | Highlight current node |
| `filterNodeMethod` | `Function` | — | Filter function |
| `emptyText` | `string` | `'No Data'` | Empty state text |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `node-click` | `(data, node, treeNode)` | Node clicked |
| `check` | `(data, { checkedNodes, checkedKeys })` | Check state changed |
| `node-expand` | `(data, node, treeNode)` | Node expanded |
| `node-collapse` | `(data, node, treeNode)` | Node collapsed |
| `current-change` | `(data, node)` | Current node changed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom node content (receives `{ node, data }`) |

### Exposed Methods

| Method | Description |
|--------|-------------|
| `filter(value)` | Filter tree nodes |
| `getCheckedNodes()` | Get checked nodes |
| `getCheckedKeys()` | Get checked node keys |
| `setCheckedKeys(keys)` | Set checked by keys |
