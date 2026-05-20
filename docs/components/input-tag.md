# InputTag

Input field that converts typed text into tags for multi-value entry.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">InputTag requires v-model for tag state. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const tags = ref(['Vue', 'React'])
</script>

<stx-input-tag v-model="tags" placeholder="Press Enter to add tag" />
```

## With Max Tags

```vue
<script setup>
import { ref } from 'vue'
const tags = ref(['Tag 1'])
</script>

<stx-input-tag v-model="tags" :max="5" placeholder="Max 5 tags" />
```

## Sizes

```vue
<stx-input-tag v-model="tags" size="small" placeholder="Small" />
<stx-input-tag v-model="tags" placeholder="Default" />
<stx-input-tag v-model="tags" size="large" placeholder="Large" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string[]` | `[]` | Tag values |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `max` | `number` | — | Maximum number of tags |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Component size |
| `clearable` | `boolean` | `false` | Show clear all button |
| `closable` | `boolean` | `true` | Show close button on tags |
| `tagType` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` | Tag color type |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(tags: string[])` | Tags changed |
| `add` | `(tag: string)` | Tag added |
| `remove` | `(tag: string)` | Tag removed |
| `clear` | — | All tags cleared |
| `focus` | `(event: FocusEvent)` | Input focused |
| `blur` | `(event: FocusEvent)` | Input blurred |
