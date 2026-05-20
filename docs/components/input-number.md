# InputNumber

Numeric input with increment and decrement controls.

## Basic Usage

<div class="demo-block">
  <stx-input-number :model-value="1" />
</div>

```vue
<script setup>
import { ref } from 'vue'
const num = ref(1)
</script>

<stx-input-number v-model="num" />
```

## Step

<div class="demo-block" style="gap: 16px;">
  <stx-input-number :model-value="5" :step="2" />
  <stx-input-number :model-value="1" :step="0.1" :precision="1" />
</div>

```vue
<stx-input-number v-model="num" :step="2" />
<stx-input-number v-model="decimal" :step="0.1" :precision="1" />
```

## Min & Max

<div class="demo-block">
  <stx-input-number :model-value="5" :min="1" :max="10" />
</div>

```vue
<stx-input-number v-model="num" :min="1" :max="10" />
```

## Controls Position

<div class="demo-block" style="gap: 16px;">
  <stx-input-number :model-value="1" controls-position="right" />
  <stx-input-number :model-value="1" :controls="false" />
</div>

```vue
<stx-input-number v-model="num" controls-position="right" />
<stx-input-number v-model="num" :controls="false" />
```

## Disabled

<div class="demo-block">
  <stx-input-number :model-value="1" disabled />
</div>

```vue
<stx-input-number v-model="num" disabled />
```

## Sizes

<div class="demo-block" style="gap: 16px; align-items: center;">
  <stx-input-number :model-value="1" size="small" />
  <stx-input-number :model-value="1" />
  <stx-input-number :model-value="1" size="large" />
</div>

```vue
<stx-input-number v-model="num" size="small" />
<stx-input-number v-model="num" />
<stx-input-number v-model="num" size="large" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `number` | — | Binding value |
| `min` | `number` | `-Infinity` | Minimum allowed value |
| `max` | `number` | `Infinity` | Maximum allowed value |
| `step` | `number` | `1` | Increment step |
| `stepStrictly` | `boolean` | `false` | Value must be a multiple of step |
| `precision` | `number` | — | Decimal precision |
| `controls` | `boolean` | `true` | Show control buttons |
| `controlsPosition` | `'' \| 'right'` | `''` | Position of control buttons |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Input size |
| `disabled` | `boolean` | `false` | Disabled state |
| `placeholder` | `string` | `''` | Placeholder text |
| `readonly` | `boolean` | `false` | Read-only state |
| `name` | `string` | `''` | Native name attribute |
| `id` | `string` | `''` | Native id attribute |
| `valueOnClear` | `number \| null` | `null` | Value when cleared |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(currentValue, oldValue)` | Value changed |
| `blur` | `(event: FocusEvent)` | Input lost focus |
| `focus` | `(event: FocusEvent)` | Input gained focus |

### Exposed Methods

| Method | Description |
|--------|-------------|
| `focus()` | Focus the input |
| `blur()` | Blur the input |
