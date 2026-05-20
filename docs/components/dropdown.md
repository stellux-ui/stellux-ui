# Dropdown

A toggleable menu for displaying a list of actions.

## Basic Usage

<div class="demo-block">
  <stx-dropdown>
    <stx-button type="primary">
      Dropdown Menu
    </stx-button>
    <template #dropdown>
      <stx-dropdown-item>Action 1</stx-dropdown-item>
      <stx-dropdown-item>Action 2</stx-dropdown-item>
      <stx-dropdown-item>Action 3</stx-dropdown-item>
      <stx-dropdown-item disabled>Disabled</stx-dropdown-item>
      <stx-dropdown-item divided>Separated</stx-dropdown-item>
    </template>
  </stx-dropdown>
</div>

```vue
<stx-dropdown>
  <stx-button type="primary">Dropdown Menu</stx-button>
  <template #dropdown>
    <stx-dropdown-item>Action 1</stx-dropdown-item>
    <stx-dropdown-item>Action 2</stx-dropdown-item>
    <stx-dropdown-item>Action 3</stx-dropdown-item>
    <stx-dropdown-item disabled>Disabled</stx-dropdown-item>
    <stx-dropdown-item divided>Separated</stx-dropdown-item>
  </template>
</stx-dropdown>
```

## Click Trigger

<div class="demo-block">
  <stx-dropdown trigger="click">
    <stx-button>Click Me</stx-button>
    <template #dropdown>
      <stx-dropdown-item command="a">Action A</stx-dropdown-item>
      <stx-dropdown-item command="b">Action B</stx-dropdown-item>
      <stx-dropdown-item command="c">Action C</stx-dropdown-item>
    </template>
  </stx-dropdown>
</div>

```vue
<stx-dropdown trigger="click">
  <stx-button>Click Me</stx-button>
  <template #dropdown>
    <stx-dropdown-item command="a">Action A</stx-dropdown-item>
    <stx-dropdown-item command="b">Action B</stx-dropdown-item>
    <stx-dropdown-item command="c">Action C</stx-dropdown-item>
  </template>
</stx-dropdown>
```

## With Commands

```vue
<script setup>
function handleCommand(command) {
  console.log('Selected:', command)
}
</script>

<stx-dropdown @command="handleCommand">
  <stx-button type="primary">Actions</stx-button>
  <template #dropdown>
    <stx-dropdown-item command="edit">Edit</stx-dropdown-item>
    <stx-dropdown-item command="copy">Copy</stx-dropdown-item>
    <stx-dropdown-item command="delete">Delete</stx-dropdown-item>
  </template>
</stx-dropdown>
```

## API

### Dropdown Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `'hover' \| 'click' \| 'contextmenu'` | `'hover'` | How to trigger the dropdown |
| `placement` | `string` | `'bottom'` | Popper placement |
| `disabled` | `boolean` | `false` | Disabled state |
| `hideOnClick` | `boolean` | `true` | Hide after clicking an item |
| `showTimeout` | `number` | `150` | Delay before showing (ms) |
| `hideTimeout` | `number` | `150` | Delay before hiding (ms) |
| `tabindex` | `number \| string` | `0` | Tabindex of the trigger |
| `maxHeight` | `number \| string` | `''` | Max height of dropdown menu |
| `popperClass` | `string` | `''` | Custom class for popper |
| `teleported` | `boolean` | `true` | Teleport dropdown to body |

### Dropdown Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `command` | `(command: any)` | Triggered when an item is clicked |
| `visible-change` | `(visible: boolean)` | Triggered when visibility changes |

### Dropdown Slots

| Slot | Description |
|------|-------------|
| `default` | Trigger element |
| `dropdown` | Dropdown menu content |

### DropdownItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `command` | `string \| number \| object` | -- | Command dispatched on click |
| `disabled` | `boolean` | `false` | Disabled state |
| `divided` | `boolean` | `false` | Show divider above |
| `icon` | `Component` | -- | Icon component |

### DropdownItem Slots

| Slot | Description |
|------|-------------|
| `default` | Item content |
