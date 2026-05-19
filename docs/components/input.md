<script setup>
import { ref } from 'vue'

const text = ref('')
const password = ref('')
const clearable = ref('clearable text')
const textarea = ref('')
const limited = ref('')
</script>

# Input

## Basic Usage

<div class="demo-block">
  <stx-input v-model="text" placeholder="Please input" />
</div>

```vue
<script setup>
import { ref } from 'vue'
const text = ref('')
</script>

<stx-input v-model="text" placeholder="Please input" />
```

## Disabled

<div class="demo-block">
  <stx-input placeholder="Disabled" disabled />
</div>

```vue
<stx-input placeholder="Disabled" disabled />
```

## Clearable

<div class="demo-block">
  <stx-input v-model="clearable" placeholder="Clearable" clearable />
</div>

```vue
<stx-input v-model="value" placeholder="Clearable" clearable />
```

## Password

<div class="demo-block">
  <stx-input v-model="password" placeholder="Password" type="password" show-password />
</div>

```vue
<stx-input v-model="password" type="password" show-password />
```

## Word Limit

<div class="demo-block">
  <stx-input v-model="limited" placeholder="Max 20 chars" maxlength="20" show-word-limit />
</div>

```vue
<stx-input v-model="value" maxlength="20" show-word-limit />
```

## Textarea

<div class="demo-block" style="flex-direction: column">
  <stx-input v-model="textarea" type="textarea" placeholder="Textarea" :rows="3" />
</div>

```vue
<stx-input v-model="value" type="textarea" :rows="3" />
```

## Sizes

<div class="demo-block" style="flex-direction: column; gap: 12px;">
  <stx-input placeholder="Small" size="small" />
  <stx-input placeholder="Default" />
  <stx-input placeholder="Large" size="large" />
</div>

```vue
<stx-input placeholder="Small" size="small" />
<stx-input placeholder="Default" />
<stx-input placeholder="Large" size="large" />
```

## Prepend & Append

<div class="demo-block" style="flex-direction: column; gap: 12px;">
  <stx-input placeholder="example.com">
    <template #prepend>https://</template>
  </stx-input>
  <stx-input placeholder="search">
    <template #append>.com</template>
  </stx-input>
  <stx-input placeholder="input">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </stx-input>
</div>

```vue
<stx-input placeholder="example.com">
  <template #prepend>https://</template>
</stx-input>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string \| number` | `''` | Binding value |
| `type` | `string` | `'text'` | Input type (`text`, `textarea`, `password`, etc.) |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Input size |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Read-only state |
| `clearable` | `boolean` | `false` | Show clear button |
| `showPassword` | `boolean` | `false` | Show password toggle |
| `showWordLimit` | `boolean` | `false` | Show word count (needs `maxlength`) |
| `maxlength` | `string \| number` | — | Max character length |
| `prefixIcon` | `Component` | — | Prefix icon |
| `suffixIcon` | `Component` | — | Suffix icon |
| `rows` | `number` | `2` | Textarea rows |
| `autosize` | `boolean \| { minRows, maxRows }` | `false` | Auto textarea height |
| `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | — | Textarea resize |
| `autofocus` | `boolean` | `false` | Auto focus on mount |

### Slots

| Slot | Description |
|------|-------------|
| `prefix` | Content inside input, before text |
| `suffix` | Content inside input, after text |
| `prepend` | Content outside input, prepended |
| `append` | Content outside input, appended |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `input` | `(value: string \| number)` | On every keystroke |
| `change` | `(value: string \| number)` | On blur after change |
| `focus` | `(event: FocusEvent)` | On focus |
| `blur` | `(event: FocusEvent)` | On blur |
| `clear` | — | On clear button click |

### Exposed Methods

| Method | Description |
|--------|-------------|
| `focus()` | Focus the input |
| `blur()` | Blur the input |
| `select()` | Select all text |
| `clear()` | Clear the value |
