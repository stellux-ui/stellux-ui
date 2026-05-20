# Radio

Single selection from a set of options.

## Basic Usage

<div class="demo-block">
  <stx-radio value="1" label="Option A" />
  <stx-radio value="2" label="Option B" />
</div>

```vue
<script setup>
import { ref } from 'vue'
const picked = ref('1')
</script>

<stx-radio v-model="picked" value="1" label="Option A" />
<stx-radio v-model="picked" value="2" label="Option B" />
```

## Radio Group

<div class="demo-block">
  <stx-radio-group>
    <stx-radio value="1" label="Option A" />
    <stx-radio value="2" label="Option B" />
    <stx-radio value="3" label="Option C" />
  </stx-radio-group>
</div>

```vue
<script setup>
import { ref } from 'vue'
const picked = ref('1')
</script>

<stx-radio-group v-model="picked">
  <stx-radio value="1" label="Option A" />
  <stx-radio value="2" label="Option B" />
  <stx-radio value="3" label="Option C" />
</stx-radio-group>
```

## Disabled

<div class="demo-block">
  <stx-radio-group>
    <stx-radio value="1" label="Available" />
    <stx-radio value="2" label="Disabled" disabled />
    <stx-radio value="3" label="Available" />
  </stx-radio-group>
</div>

```vue
<stx-radio-group v-model="picked">
  <stx-radio value="1" label="Available" />
  <stx-radio value="2" label="Disabled" disabled />
  <stx-radio value="3" label="Available" />
</stx-radio-group>
```

## With Border

<div class="demo-block">
  <stx-radio-group>
    <stx-radio value="1" label="Option A" border />
    <stx-radio value="2" label="Option B" border />
    <stx-radio value="3" label="Option C" border />
  </stx-radio-group>
</div>

```vue
<stx-radio-group v-model="picked">
  <stx-radio value="1" label="Option A" border />
  <stx-radio value="2" label="Option B" border />
  <stx-radio value="3" label="Option C" border />
</stx-radio-group>
```

## Sizes

<div class="demo-block" style="flex-direction: column; gap: 12px;">
  <stx-radio-group size="small">
    <stx-radio value="1" label="Small A" border />
    <stx-radio value="2" label="Small B" border />
  </stx-radio-group>
  <stx-radio-group>
    <stx-radio value="1" label="Default A" border />
    <stx-radio value="2" label="Default B" border />
  </stx-radio-group>
  <stx-radio-group size="large">
    <stx-radio value="1" label="Large A" border />
    <stx-radio value="2" label="Large B" border />
  </stx-radio-group>
</div>

```vue
<stx-radio-group v-model="picked" size="small">
  <stx-radio value="1" label="Small A" border />
  <stx-radio value="2" label="Small B" border />
</stx-radio-group>
```

## API

### Radio Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string \| number \| boolean` | — | Binding value |
| `value` | `string \| number \| boolean` | — | Radio value |
| `label` | `string` | `''` | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Radio size |
| `border` | `boolean` | `false` | Show border |
| `name` | `string` | `''` | Native name attribute |

### Radio Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: string \| number \| boolean)` | Selected value changed |

### RadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string \| number \| boolean` | — | Binding value |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Size for all radios |
| `disabled` | `boolean` | `false` | Disable all radios |
| `textColor` | `string` | `''` | Text color when active |
| `fill` | `string` | `''` | Fill color when active |

### RadioGroup Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: string \| number \| boolean)` | Selected value changed |
