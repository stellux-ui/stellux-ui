# Menu

A vertical or horizontal navigation menu.

## Basic Usage

<div class="demo-block" style="flex-direction: column;">
  <stx-menu default-active="1">
    <stx-menu-item index="1">Home</stx-menu-item>
    <stx-menu-item index="2">About</stx-menu-item>
    <stx-sub-menu index="3">
      <template #title>Settings</template>
      <stx-menu-item index="3-1">Profile</stx-menu-item>
      <stx-menu-item index="3-2">Security</stx-menu-item>
    </stx-sub-menu>
    <stx-menu-item index="4" disabled>Disabled</stx-menu-item>
  </stx-menu>
</div>

```vue
<stx-menu default-active="1">
  <stx-menu-item index="1">Home</stx-menu-item>
  <stx-menu-item index="2">About</stx-menu-item>
  <stx-sub-menu index="3">
    <template #title>Settings</template>
    <stx-menu-item index="3-1">Profile</stx-menu-item>
    <stx-menu-item index="3-2">Security</stx-menu-item>
  </stx-sub-menu>
  <stx-menu-item index="4" disabled>Disabled</stx-menu-item>
</stx-menu>
```

## Horizontal Mode

<div class="demo-block">
  <stx-menu mode="horizontal" default-active="1">
    <stx-menu-item index="1">Home</stx-menu-item>
    <stx-menu-item index="2">Products</stx-menu-item>
    <stx-sub-menu index="3">
      <template #title>Services</template>
      <stx-menu-item index="3-1">Consulting</stx-menu-item>
      <stx-menu-item index="3-2">Development</stx-menu-item>
    </stx-sub-menu>
    <stx-menu-item index="4">Contact</stx-menu-item>
  </stx-menu>
</div>

```vue
<stx-menu mode="horizontal" default-active="1">
  <stx-menu-item index="1">Home</stx-menu-item>
  <stx-menu-item index="2">Products</stx-menu-item>
  <stx-sub-menu index="3">
    <template #title>Services</template>
    <stx-menu-item index="3-1">Consulting</stx-menu-item>
    <stx-menu-item index="3-2">Development</stx-menu-item>
  </stx-sub-menu>
  <stx-menu-item index="4">Contact</stx-menu-item>
</stx-menu>
```

## Collapsed

<div class="demo-block">
  <stx-menu default-active="1" collapse style="width: 64px;">
    <stx-menu-item index="1">
      <template #title>Home</template>
    </stx-menu-item>
    <stx-menu-item index="2">
      <template #title>About</template>
    </stx-menu-item>
  </stx-menu>
</div>

```vue
<stx-menu default-active="1" collapse>
  <stx-menu-item index="1">
    <template #title>Home</template>
  </stx-menu-item>
  <stx-menu-item index="2">
    <template #title>About</template>
  </stx-menu-item>
</stx-menu>
```

## Menu Item Group

<div class="demo-block" style="flex-direction: column;">
  <stx-menu default-active="1">
    <stx-menu-item-group title="Navigation">
      <stx-menu-item index="1">Home</stx-menu-item>
      <stx-menu-item index="2">About</stx-menu-item>
    </stx-menu-item-group>
    <stx-menu-item-group title="Settings">
      <stx-menu-item index="3">Profile</stx-menu-item>
      <stx-menu-item index="4">Account</stx-menu-item>
    </stx-menu-item-group>
  </stx-menu>
</div>

```vue
<stx-menu default-active="1">
  <stx-menu-item-group title="Navigation">
    <stx-menu-item index="1">Home</stx-menu-item>
    <stx-menu-item index="2">About</stx-menu-item>
  </stx-menu-item-group>
  <stx-menu-item-group title="Settings">
    <stx-menu-item index="3">Profile</stx-menu-item>
    <stx-menu-item index="4">Account</stx-menu-item>
  </stx-menu-item-group>
</stx-menu>
```

## API

### Menu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'horizontal' \| 'vertical'` | `'vertical'` | Menu display mode |
| `defaultActive` | `string` | `''` | Default active menu item index |
| `defaultOpeneds` | `string[]` | `[]` | Default opened sub-menus |
| `uniqueOpened` | `boolean` | `false` | Only one sub-menu open at a time |
| `collapse` | `boolean` | `false` | Collapse the menu (vertical only) |
| `backgroundColor` | `string` | `''` | Background color |
| `textColor` | `string` | `''` | Text color |
| `activeTextColor` | `string` | `''` | Active item text color |
| `router` | `boolean` | `false` | Enable vue-router mode |
| `collapseTransition` | `boolean` | `true` | Enable collapse transition |

### Menu Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `select` | `(index: string, indexPath: string[])` | Triggered when a menu item is selected |
| `open` | `(index: string, indexPath: string[])` | Triggered when a sub-menu opens |
| `close` | `(index: string, indexPath: string[])` | Triggered when a sub-menu closes |

### MenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `string` | -- (required) | Unique identifier |
| `disabled` | `boolean` | `false` | Disabled state |
| `route` | `string \| object` | -- | Vue-router route object |

### MenuItem Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `click` | `({ index, indexPath })` | Triggered on click |

### MenuItem Slots

| Slot | Description |
|------|-------------|
| `default` | Menu item content |
| `title` | Title content (used when menu is collapsed) |

### SubMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `string` | -- (required) | Unique identifier |
| `disabled` | `boolean` | `false` | Disabled state |
| `popperOffset` | `number` | `6` | Popper offset in px |
| `showTimeout` | `number` | `300` | Delay before showing (ms) |
| `hideTimeout` | `number` | `300` | Delay before hiding (ms) |

### SubMenu Slots

| Slot | Description |
|------|-------------|
| `default` | Sub-menu content (menu items) |
| `title` | Sub-menu title |

### MenuItemGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Group title |

### MenuItemGroup Slots

| Slot | Description |
|------|-------------|
| `default` | Group content (menu items) |
| `title` | Custom group title |
