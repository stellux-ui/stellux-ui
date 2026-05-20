# DatePicker

Select a date or date range from a calendar panel.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">DatePicker requires v-model for date state. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const date = ref('')
</script>

<stx-date-picker v-model="date" placeholder="Select date" />
```

## Date Range

```vue
<script setup>
import { ref } from 'vue'
const dateRange = ref([])
</script>

<stx-date-picker
  v-model="dateRange"
  type="daterange"
  start-placeholder="Start date"
  end-placeholder="End date"
/>
```

## Month & Year Picker

```vue
<stx-date-picker v-model="month" type="month" placeholder="Select month" />
<stx-date-picker v-model="year" type="year" placeholder="Select year" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `Date \| string \| Array` | — | Binding value |
| `type` | `'date' \| 'daterange' \| 'month' \| 'year' \| 'week' \| 'datetime'` | `'date'` | Picker type |
| `placeholder` | `string` | — | Placeholder text |
| `startPlaceholder` | `string` | — | Range start placeholder |
| `endPlaceholder` | `string` | — | Range end placeholder |
| `format` | `string` | `'YYYY-MM-DD'` | Display format |
| `valueFormat` | `string` | — | Binding value format |
| `disabled` | `boolean` | `false` | Disabled state |
| `clearable` | `boolean` | `true` | Show clear button |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Picker size |
| `disabledDate` | `(date: Date) => boolean` | — | Disable specific dates |
| `shortcuts` | `Array<{ text, value }>` | — | Quick selection shortcuts |
| `editable` | `boolean` | `true` | Allow manual input |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value)` | Date value changed |
| `blur` | `(event: FocusEvent)` | Input blurred |
| `focus` | `(event: FocusEvent)` | Input focused |
| `visible-change` | `(visible: boolean)` | Panel visibility changed |
