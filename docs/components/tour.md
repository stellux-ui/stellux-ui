# Tour

Guide users through features with a step-by-step interactive tour overlay.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Tour requires reactive state and DOM element references. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
const btnRef = ref(null)
const inputRef = ref(null)

const steps = ref([
  {
    title: 'Welcome',
    description: 'This is the main action button.',
    target: () => btnRef.value?.$el,
  },
  {
    title: 'Search',
    description: 'Use this input to search.',
    target: () => inputRef.value?.$el,
  },
  {
    title: 'Finished',
    description: 'You are all set!',
  },
])
</script>

<stx-button ref="btnRef" type="primary" @click="open = true">Start Tour</stx-button>
<stx-input ref="inputRef" placeholder="Search..." style="width: 200px; margin-left: 12px;" />

<stx-tour v-model="open" :steps="steps" />
```

## Placement

```vue
<stx-tour v-model="open" :steps="steps" placement="bottom" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `boolean` | `false` | Show/hide the tour |
| `steps` | `Array<{ title, description, target? }>` | `[]` | Tour steps |
| `current` | `number` | `0` | Current step index |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Popover placement |
| `mask` | `boolean \| { style, color }` | `true` | Show overlay mask |
| `type` | `'default' \| 'primary'` | `'default'` | Tour style type |
| `scrollIntoViewOptions` | `boolean \| ScrollIntoViewOptions` | `true` | Auto scroll to target |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `close` | `(current: number)` | Tour closed |
| `finish` | — | All steps completed |
| `change` | `(current: number)` | Step changed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom step content |
| `indicators` | Custom step indicators (receives `{ current, total }`) |
