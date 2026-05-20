# ColorPicker

Select a color value from a panel with various format support.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">ColorPicker requires v-model for color state. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const color = ref('#409eff')
</script>

<stx-color-picker v-model="color" />
```

## With Alpha

```vue
<script setup>
import { ref } from 'vue'
const color = ref('rgba(64, 158, 255, 0.8)')
</script>

<stx-color-picker v-model="color" show-alpha />
```

## Predefined Colors

```vue
<stx-color-picker
  v-model="color"
  :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string` | — | Binding color value |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Picker size |
| `showAlpha` | `boolean` | `false` | Show alpha slider |
| `colorFormat` | `'hex' \| 'rgb' \| 'hsl' \| 'hsv'` | — | Output color format |
| `predefine` | `string[]` | — | Predefined color swatches |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: string)` | Color value changed |
| `active-change` | `(value: string)` | Color changing (while picking) |
