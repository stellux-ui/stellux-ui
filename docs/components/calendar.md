# Calendar

Display a full calendar panel for date viewing and selection.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Calendar requires v-model for date state. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const date = ref(new Date())
</script>

<stx-calendar v-model="date" />
```

## With Custom Cell Content

```vue
<script setup>
import { ref } from 'vue'
const date = ref(new Date())
</script>

<stx-calendar v-model="date">
  <template #date-cell="{ data }">
    <div>
      {{ data.day.split('-').slice(-1)[0] }}
      <span v-if="data.day === '2024-01-01'" style="color: var(--stx-color-danger);">Holiday</span>
    </div>
  </template>
</stx-calendar>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `Date` | — | Selected date |
| `range` | `[Date, Date]` | — | Date range to display |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(date: Date)` | Selected date changed |

### Slots

| Slot | Description |
|------|-------------|
| `date-cell` | Custom date cell (receives `{ data }`) |
| `header` | Custom header content |
