# Tabs

Divide content into multiple sections under selectable tab labels.

## Basic Usage

<div class="demo-block" style="flex-direction: column;">
  <stx-tabs model-value="first">
    <stx-tab-pane label="Tab 1" name="first">Content of Tab 1</stx-tab-pane>
    <stx-tab-pane label="Tab 2" name="second">Content of Tab 2</stx-tab-pane>
    <stx-tab-pane label="Tab 3" name="third">Content of Tab 3</stx-tab-pane>
  </stx-tabs>
</div>

```vue
<stx-tabs model-value="first">
  <stx-tab-pane label="Tab 1" name="first">Content of Tab 1</stx-tab-pane>
  <stx-tab-pane label="Tab 2" name="second">Content of Tab 2</stx-tab-pane>
  <stx-tab-pane label="Tab 3" name="third">Content of Tab 3</stx-tab-pane>
</stx-tabs>
```

## Card Type

<div class="demo-block" style="flex-direction: column;">
  <stx-tabs model-value="first" type="card">
    <stx-tab-pane label="Tab 1" name="first">Content of Tab 1</stx-tab-pane>
    <stx-tab-pane label="Tab 2" name="second">Content of Tab 2</stx-tab-pane>
    <stx-tab-pane label="Tab 3" name="third">Content of Tab 3</stx-tab-pane>
  </stx-tabs>
</div>

```vue
<stx-tabs model-value="first" type="card">
  <stx-tab-pane label="Tab 1" name="first">Content of Tab 1</stx-tab-pane>
  <stx-tab-pane label="Tab 2" name="second">Content of Tab 2</stx-tab-pane>
  <stx-tab-pane label="Tab 3" name="third">Content of Tab 3</stx-tab-pane>
</stx-tabs>
```

## Border Card

<div class="demo-block" style="flex-direction: column;">
  <stx-tabs model-value="first" type="border-card">
    <stx-tab-pane label="Tab 1" name="first">Content of Tab 1</stx-tab-pane>
    <stx-tab-pane label="Tab 2" name="second">Content of Tab 2</stx-tab-pane>
    <stx-tab-pane label="Tab 3" name="third">Content of Tab 3</stx-tab-pane>
  </stx-tabs>
</div>

```vue
<stx-tabs model-value="first" type="border-card">
  <stx-tab-pane label="Tab 1" name="first">Content of Tab 1</stx-tab-pane>
  <stx-tab-pane label="Tab 2" name="second">Content of Tab 2</stx-tab-pane>
  <stx-tab-pane label="Tab 3" name="third">Content of Tab 3</stx-tab-pane>
</stx-tabs>
```

## Disabled Tab

<div class="demo-block" style="flex-direction: column;">
  <stx-tabs model-value="first">
    <stx-tab-pane label="Active" name="first">Active tab content</stx-tab-pane>
    <stx-tab-pane label="Disabled" name="second" disabled>Disabled tab content</stx-tab-pane>
    <stx-tab-pane label="Another" name="third">Another tab content</stx-tab-pane>
  </stx-tabs>
</div>

```vue
<stx-tabs model-value="first">
  <stx-tab-pane label="Active" name="first">Active tab content</stx-tab-pane>
  <stx-tab-pane label="Disabled" name="second" disabled>Disabled</stx-tab-pane>
  <stx-tab-pane label="Another" name="third">Another tab content</stx-tab-pane>
</stx-tabs>
```

## API

### Tabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string \| number` | `''` | Active tab name |
| `type` | `'' \| 'card' \| 'border-card'` | `''` | Tab style type |
| `closable` | `boolean` | `false` | Tabs can be closed |
| `addable` | `boolean` | `false` | Show add tab button |
| `editable` | `boolean` | `false` | Both closable and addable |
| `tabPosition` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Tab bar position |
| `stretch` | `boolean` | `false` | Stretch tab width to fill |
| `beforeLeave` | `(newTab, oldTab) => boolean \| Promise<boolean>` | -- | Guard before switching tabs |

### Tabs Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `tab-click` | `(pane: TabPaneData, event: Event)` | Triggered when a tab is clicked |
| `tab-change` | `(name: string \| number)` | Triggered when active tab changes |
| `tab-remove` | `(name: string \| number)` | Triggered when a tab is removed |
| `tab-add` | -- | Triggered when add button is clicked |
| `edit` | `(name, action: 'add' \| 'remove')` | Triggered on add or remove |

### TabPane Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string \| number` | -- (required) | Tab identifier |
| `label` | `string` | `''` | Tab label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `closable` | `boolean` | `false` | Individual tab closable |
| `lazy` | `boolean` | `false` | Lazy render content |

### TabPane Slots

| Slot | Description |
|------|-------------|
| `default` | Tab pane content |
| `label` | Custom tab label |
