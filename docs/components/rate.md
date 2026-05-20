# Rate

Star-based rating input for scoring or feedback.

## Basic Usage

<div class="demo-block">
  <stx-rate :model-value="3" disabled />
  <stx-rate :model-value="4.5" disabled allow-half />
</div>

```vue
<script setup>
import { ref } from 'vue'
const value = ref(3)
</script>

<stx-rate v-model="value" />
```

## Half Star

<div class="demo-block">
  <stx-rate :model-value="2.5" disabled allow-half />
</div>

```vue
<stx-rate v-model="value" allow-half />
```

## Sizes

<div class="demo-block" style="align-items: center; gap: 24px;">
  <stx-rate :model-value="3" disabled size="small" />
  <stx-rate :model-value="3" disabled />
  <stx-rate :model-value="3" disabled size="large" />
</div>

```vue
<stx-rate v-model="value" size="small" />
<stx-rate v-model="value" />
<stx-rate v-model="value" size="large" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `number` | `0` | Binding value |
| `max` | `number` | `5` | Max rating value |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Star size |
| `disabled` | `boolean` | `false` | Read-only state |
| `allowHalf` | `boolean` | `false` | Allow half-star selection |
| `colors` | `Array<string> \| object` | — | Custom colors for levels |
| `voidColor` | `string` | — | Color of unselected stars |
| `showText` | `boolean` | `false` | Show rating text |
| `texts` | `string[]` | — | Text for each level |
| `showScore` | `boolean` | `false` | Show numeric score |
| `clearable` | `boolean` | `false` | Allow clearing value |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: number)` | Rating changed |
