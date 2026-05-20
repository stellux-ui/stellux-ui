# InputOTP

One-time password input with separate digit fields for verification codes.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">InputOTP requires v-model for code state. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const code = ref('')
</script>

<stx-input-otp v-model="code" :length="6" />
```

## Custom Length

```vue
<stx-input-otp v-model="code" :length="4" />
```

## With Separator

```vue
<stx-input-otp v-model="code" :length="6" separator="-" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string` | `''` | Binding value |
| `length` | `number` | `6` | Number of input fields |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Input size |
| `separator` | `string` | — | Separator between fields |
| `type` | `'text' \| 'password'` | `'text'` | Input type |
| `autofocus` | `boolean` | `false` | Auto focus first field |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: string)` | Value changed |
| `complete` | `(value: string)` | All fields filled |
| `focus` | `(event: FocusEvent)` | Field focused |
| `blur` | `(event: FocusEvent)` | Field blurred |
