# TimePicker

Select a time value from a dropdown panel.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">TimePicker requires v-model for time state. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const time = ref('')
</script>

<stx-time-picker v-model="time" placeholder="Select time" />
```

## Time Range

```vue
<script setup>
import { ref } from 'vue'
const timeRange = ref([])
</script>

<stx-time-picker
  v-model="timeRange"
  is-range
  start-placeholder="Start time"
  end-placeholder="End time"
/>
```

## Fixed Time List

```vue
<stx-time-select v-model="time" start="08:00" end="18:00" step="00:30" placeholder="Select time" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `Date \| string \| Array` | — | Binding value |
| `isRange` | `boolean` | `false` | Enable range mode |
| `placeholder` | `string` | — | Placeholder text |
| `startPlaceholder` | `string` | — | Range start placeholder |
| `endPlaceholder` | `string` | — | Range end placeholder |
| `format` | `string` | `'HH:mm:ss'` | Display format |
| `disabled` | `boolean` | `false` | Disabled state |
| `clearable` | `boolean` | `true` | Show clear button |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Picker size |
| `editable` | `boolean` | `true` | Allow manual input |
| `disabledHours` | `() => number[]` | — | Disabled hours |
| `disabledMinutes` | `(hour: number) => number[]` | — | Disabled minutes |
| `disabledSeconds` | `(hour, minute) => number[]` | — | Disabled seconds |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value)` | Time value changed |
| `blur` | `(event: FocusEvent)` | Input blurred |
| `focus` | `(event: FocusEvent)` | Input focused |
| `visible-change` | `(visible: boolean)` | Panel visibility changed |
