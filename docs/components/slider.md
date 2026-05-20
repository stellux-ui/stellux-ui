# Slider

Select a value from a range by dragging a handle along a track.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Slider requires v-model for interactive state. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const value = ref(30)
</script>

<stx-slider v-model="value" />
```

## Range Selection

```vue
<script setup>
import { ref } from 'vue'
const range = ref([20, 60])
</script>

<stx-slider v-model="range" range />
```

## With Steps and Marks

```vue
<script setup>
import { ref } from 'vue'
const value = ref(50)
</script>

<stx-slider v-model="value" :step="10" show-stops />

<stx-slider
  v-model="value"
  :marks="{ 0: '0%', 50: '50%', 100: '100%' }"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `number \| number[]` | `0` | Binding value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disabled state |
| `showInput` | `boolean` | `false` | Show input box |
| `showStops` | `boolean` | `false` | Show step stops |
| `showTooltip` | `boolean` | `true` | Show tooltip on drag |
| `range` | `boolean` | `false` | Enable range mode |
| `vertical` | `boolean` | `false` | Vertical orientation |
| `height` | `string` | — | Slider height (vertical mode) |
| `marks` | `object` | — | Marks on the slider |
| `formatTooltip` | `(value: number) => string` | — | Format tooltip text |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: number \| number[])` | Value changed (on release) |
| `input` | `(value: number \| number[])` | Value changing (while dragging) |
