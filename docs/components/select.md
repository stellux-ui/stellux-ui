# Select

Dropdown selection from a list of options.

## Basic Usage

<div class="demo-block">
  <stx-select placeholder="Select" style="width: 200px;">
    <stx-option value="option1" label="Option 1" />
    <stx-option value="option2" label="Option 2" />
    <stx-option value="option3" label="Option 3" />
    <stx-option value="option4" label="Option 4" />
  </stx-select>
</div>

```vue
<script setup>
import { ref } from 'vue'
const value = ref('')
</script>

<stx-select v-model="value" placeholder="Select">
  <stx-option value="option1" label="Option 1" />
  <stx-option value="option2" label="Option 2" />
  <stx-option value="option3" label="Option 3" />
  <stx-option value="option4" label="Option 4" />
</stx-select>
```

## Disabled Options

<div class="demo-block">
  <stx-select placeholder="Select" style="width: 200px;">
    <stx-option value="option1" label="Option 1" />
    <stx-option value="option2" label="Option 2" disabled />
    <stx-option value="option3" label="Option 3" />
  </stx-select>
</div>

```vue
<stx-select v-model="value" placeholder="Select">
  <stx-option value="option1" label="Option 1" />
  <stx-option value="option2" label="Option 2" disabled />
  <stx-option value="option3" label="Option 3" />
</stx-select>
```

## Clearable

<div class="demo-block">
  <stx-select placeholder="Clearable" clearable style="width: 200px;">
    <stx-option value="option1" label="Option 1" />
    <stx-option value="option2" label="Option 2" />
    <stx-option value="option3" label="Option 3" />
  </stx-select>
</div>

```vue
<stx-select v-model="value" placeholder="Clearable" clearable>
  <stx-option value="option1" label="Option 1" />
  <stx-option value="option2" label="Option 2" />
  <stx-option value="option3" label="Option 3" />
</stx-select>
```

## Multiple

<div class="demo-block">
  <stx-select placeholder="Multiple" multiple style="width: 300px;">
    <stx-option value="option1" label="Option 1" />
    <stx-option value="option2" label="Option 2" />
    <stx-option value="option3" label="Option 3" />
    <stx-option value="option4" label="Option 4" />
    <stx-option value="option5" label="Option 5" />
  </stx-select>
</div>

```vue
<script setup>
import { ref } from 'vue'
const selected = ref([])
</script>

<stx-select v-model="selected" placeholder="Multiple" multiple>
  <stx-option value="option1" label="Option 1" />
  <stx-option value="option2" label="Option 2" />
  <stx-option value="option3" label="Option 3" />
  <stx-option value="option4" label="Option 4" />
  <stx-option value="option5" label="Option 5" />
</stx-select>
```

## Filterable

<div class="demo-block">
  <stx-select placeholder="Search..." filterable style="width: 200px;">
    <stx-option value="option1" label="Option 1" />
    <stx-option value="option2" label="Option 2" />
    <stx-option value="option3" label="Option 3" />
    <stx-option value="option4" label="Option 4" />
  </stx-select>
</div>

```vue
<stx-select v-model="value" placeholder="Search..." filterable>
  <stx-option value="option1" label="Option 1" />
  <stx-option value="option2" label="Option 2" />
  <stx-option value="option3" label="Option 3" />
</stx-select>
```

## Option Group

<div class="demo-block">
  <stx-select placeholder="Grouped" style="width: 200px;">
    <stx-option-group label="Fruits">
      <stx-option value="apple" label="Apple" />
      <stx-option value="banana" label="Banana" />
      <stx-option value="orange" label="Orange" />
    </stx-option-group>
    <stx-option-group label="Vegetables">
      <stx-option value="carrot" label="Carrot" />
      <stx-option value="potato" label="Potato" />
    </stx-option-group>
  </stx-select>
</div>

```vue
<stx-select v-model="value" placeholder="Grouped">
  <stx-option-group label="Fruits">
    <stx-option value="apple" label="Apple" />
    <stx-option value="banana" label="Banana" />
  </stx-option-group>
  <stx-option-group label="Vegetables">
    <stx-option value="carrot" label="Carrot" />
    <stx-option value="potato" label="Potato" />
  </stx-option-group>
</stx-select>
```

## API

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `any` | — | Binding value |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Select size |
| `clearable` | `boolean` | `false` | Show clear button |
| `filterable` | `boolean` | `false` | Enable search filter |
| `allowCreate` | `boolean` | `false` | Allow creating new options |
| `loading` | `boolean` | `false` | Loading state |
| `loadingText` | `string` | `'Loading...'` | Loading text |
| `noDataText` | `string` | `'No data'` | Empty state text |
| `noMatchText` | `string` | `'No matching data'` | No match text |
| `placeholder` | `string` | `'Select'` | Placeholder text |
| `multipleLimit` | `number` | `0` | Max selections (0 = unlimited) |
| `collapseTags` | `boolean` | `false` | Collapse tags in multiple mode |
| `collapseTagsTooltip` | `boolean` | `false` | Show tooltip for collapsed tags |
| `maxCollapseTags` | `number` | `1` | Max tags before collapsing |
| `teleported` | `boolean` | `true` | Teleport dropdown to body |
| `persistent` | `boolean` | `true` | Keep dropdown in DOM |
| `popperClass` | `string` | `''` | Custom dropdown class |
| `effect` | `'dark' \| 'light'` | `'light'` | Dropdown theme |
| `placement` | `string` | `'bottom-start'` | Dropdown placement |
| `offset` | `number` | `4` | Dropdown offset |

### Select Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: any)` | Selected value changed |
| `visible-change` | `(visible: boolean)` | Dropdown visibility changed |
| `remove-tag` | `(value: any)` | Tag removed in multiple mode |
| `clear` | — | Clear button clicked |
| `blur` | `(event: FocusEvent)` | Input lost focus |
| `focus` | `(event: FocusEvent)` | Input gained focus |

### Option Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | (required) | Option value |
| `label` | `string \| number` | `''` | Option display label |
| `disabled` | `boolean` | `false` | Disabled state |

### OptionGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Group label |
| `disabled` | `boolean` | `false` | Disable all options in group |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Option list |
| `prefix` | Prefix content in input |
| `empty` | Custom empty state |
