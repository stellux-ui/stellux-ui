# Checkbox

Multiple selections from a set of options.

## Basic Usage

<div class="demo-block">
  <stx-checkbox label="Option A" />
  <stx-checkbox label="Option B" />
</div>

```vue
<script setup>
import { ref } from 'vue'
const checked = ref(true)
</script>

<stx-checkbox v-model="checked" label="Option A" />
<stx-checkbox label="Option B" />
```

## Checkbox Group

<div class="demo-block">
  <stx-checkbox-group>
    <stx-checkbox value="a" label="Option A" />
    <stx-checkbox value="b" label="Option B" />
    <stx-checkbox value="c" label="Option C" />
  </stx-checkbox-group>
</div>

```vue
<script setup>
import { ref } from 'vue'
const selected = ref(['a'])
</script>

<stx-checkbox-group v-model="selected">
  <stx-checkbox value="a" label="Option A" />
  <stx-checkbox value="b" label="Option B" />
  <stx-checkbox value="c" label="Option C" />
</stx-checkbox-group>
```

## Disabled

<div class="demo-block">
  <stx-checkbox label="Available" />
  <stx-checkbox label="Disabled" disabled />
  <stx-checkbox label="Disabled Checked" disabled checked />
</div>

```vue
<stx-checkbox label="Available" />
<stx-checkbox label="Disabled" disabled />
<stx-checkbox label="Disabled Checked" disabled checked />
```

## Indeterminate

<div class="demo-block" style="flex-direction: column; gap: 12px;">
  <stx-checkbox label="Select All" indeterminate />
  <stx-checkbox-group>
    <stx-checkbox value="a" label="Option A" />
    <stx-checkbox value="b" label="Option B" />
    <stx-checkbox value="c" label="Option C" />
  </stx-checkbox-group>
</div>

```vue
<script setup>
import { ref, computed } from 'vue'
const selected = ref(['a'])
const allOptions = ['a', 'b', 'c']
const checkAll = computed(() => selected.value.length === allOptions.length)
const indeterminate = computed(
  () => selected.value.length > 0 && selected.value.length < allOptions.length
)
</script>

<stx-checkbox
  v-model="checkAll"
  :indeterminate="indeterminate"
  label="Select All"
/>
<stx-checkbox-group v-model="selected">
  <stx-checkbox value="a" label="Option A" />
  <stx-checkbox value="b" label="Option B" />
  <stx-checkbox value="c" label="Option C" />
</stx-checkbox-group>
```

## With Border

<div class="demo-block">
  <stx-checkbox-group>
    <stx-checkbox value="a" label="Option A" border />
    <stx-checkbox value="b" label="Option B" border />
    <stx-checkbox value="c" label="Option C" border />
  </stx-checkbox-group>
</div>

```vue
<stx-checkbox-group v-model="selected">
  <stx-checkbox value="a" label="Option A" border />
  <stx-checkbox value="b" label="Option B" border />
  <stx-checkbox value="c" label="Option C" border />
</stx-checkbox-group>
```

## API

### Checkbox Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `boolean \| string \| number \| any[]` | — | Binding value |
| `value` | `string \| number \| boolean` | — | Checkbox value (for group) |
| `label` | `string` | `''` | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `checked` | `boolean` | `false` | Default checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Checkbox size |
| `border` | `boolean` | `false` | Show border |
| `trueValue` | `string \| number \| boolean` | `true` | Value when checked |
| `falseValue` | `string \| number \| boolean` | `false` | Value when unchecked |
| `name` | `string` | `''` | Native name attribute |

### Checkbox Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: any)` | Value changed |

### CheckboxGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `any[]` | `[]` | Binding value |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Size for all checkboxes |
| `disabled` | `boolean` | `false` | Disable all checkboxes |
| `min` | `number` | — | Minimum selections |
| `max` | `number` | — | Maximum selections |

### CheckboxGroup Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: any[])` | Selected values changed |
