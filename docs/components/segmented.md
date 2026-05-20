# Segmented

A segmented control for switching between options, similar to a tab bar.

## Basic Usage

<div class="demo-block">
  <stx-segmented :options="['Daily', 'Weekly', 'Monthly']" />
</div>

::: info
Segmented control requires `v-model` for state management in real usage.
:::

```vue
<script setup>
import { ref } from 'vue'
const value = ref('Daily')
</script>

<stx-segmented v-model="value" :options="['Daily', 'Weekly', 'Monthly']" />
```

## Block Mode

<div class="demo-block" style="width: 100%;">
  <stx-segmented :options="['Option A', 'Option B', 'Option C']" block />
</div>

```vue
<stx-segmented v-model="value" :options="['Option A', 'Option B', 'Option C']" block />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string \| number` | — | Selected value |
| `options` | `Array<string \| number \| { label, value, disabled }>` | `[]` | Option list |
| `block` | `boolean` | `false` | Fit container width |
| `disabled` | `boolean` | `false` | Disable all options |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Control size |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: string \| number)` | Triggered when selection changes |
