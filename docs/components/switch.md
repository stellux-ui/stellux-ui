# Switch

Toggle between two states.

## Basic Usage

<div class="demo-block">
  <stx-switch />
</div>

```vue
<script setup>
import { ref } from 'vue'
const value = ref(false)
</script>

<stx-switch v-model="value" />
```

## With Text

<div class="demo-block" style="gap: 24px;">
  <stx-switch active-text="Open" inactive-text="Close" />
  <stx-switch active-text="Yes" inactive-text="No" />
</div>

```vue
<stx-switch v-model="value" active-text="Open" inactive-text="Close" />
```

## Inline Prompt

<div class="demo-block" style="gap: 24px;">
  <stx-switch inline-prompt active-text="Y" inactive-text="N" />
  <stx-switch inline-prompt active-text="ON" inactive-text="OFF" style="--stx-switch-on-color: #13ce66; --stx-switch-off-color: #ff4949;" />
</div>

```vue
<stx-switch v-model="value" inline-prompt active-text="Y" inactive-text="N" />
```

## Sizes

<div class="demo-block" style="gap: 24px; align-items: center;">
  <stx-switch size="small" />
  <stx-switch />
  <stx-switch size="large" />
</div>

```vue
<stx-switch size="small" />
<stx-switch />
<stx-switch size="large" />
```

## Loading

<div class="demo-block" style="gap: 24px;">
  <stx-switch loading />
  <stx-switch loading :model-value="true" />
</div>

```vue
<stx-switch v-model="value" loading />
```

## Disabled

<div class="demo-block" style="gap: 24px;">
  <stx-switch disabled />
  <stx-switch disabled :model-value="true" />
</div>

```vue
<stx-switch v-model="value" disabled />
```

## Custom Colors

<div class="demo-block" style="gap: 24px;">
  <stx-switch active-color="#13ce66" inactive-color="#ff4949" />
  <stx-switch active-color="#409eff" inactive-color="#dcdfe6" :model-value="true" />
</div>

```vue
<stx-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `boolean \| string \| number` | `false` | Binding value |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Switch size |
| `width` | `string \| number` | `''` | Custom switch width |
| `activeText` | `string` | `''` | Text when active |
| `inactiveText` | `string` | `''` | Text when inactive |
| `activeValue` | `boolean \| string \| number` | `true` | Value when active |
| `inactiveValue` | `boolean \| string \| number` | `false` | Value when inactive |
| `activeColor` | `string` | `''` | Background color when active |
| `inactiveColor` | `string` | `''` | Background color when inactive |
| `activeIcon` | `Component` | — | Icon when active |
| `inactiveIcon` | `Component` | — | Icon when inactive |
| `inlinePrompt` | `boolean` | `false` | Show text inside switch |
| `beforeChange` | `() => Promise<boolean> \| boolean` | — | Hook before value changes |
| `name` | `string` | `''` | Native input name |
| `id` | `string` | `''` | Native input id |
| `tabindex` | `string \| number` | `0` | Native tabindex |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: boolean \| string \| number)` | Value changed |
