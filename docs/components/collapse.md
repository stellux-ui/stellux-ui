# Collapse

Toggle the display of content sections through collapsible panels.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-collapse>
    <stx-collapse-item title="Section 1" name="1">
      <p>Content for section 1. This is a collapsible panel.</p>
    </stx-collapse-item>
    <stx-collapse-item title="Section 2" name="2">
      <p>Content for section 2. Click the header to toggle.</p>
    </stx-collapse-item>
    <stx-collapse-item title="Section 3" name="3">
      <p>Content for section 3. Multiple panels can be open.</p>
    </stx-collapse-item>
  </stx-collapse>
</div>

```vue
<stx-collapse>
  <stx-collapse-item title="Section 1" name="1">
    <p>Content for section 1.</p>
  </stx-collapse-item>
  <stx-collapse-item title="Section 2" name="2">
    <p>Content for section 2.</p>
  </stx-collapse-item>
  <stx-collapse-item title="Section 3" name="3">
    <p>Content for section 3.</p>
  </stx-collapse-item>
</stx-collapse>
```

## Accordion Mode

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-collapse accordion>
    <stx-collapse-item title="Accordion 1" name="1">
      <p>Only one panel open at a time in accordion mode.</p>
    </stx-collapse-item>
    <stx-collapse-item title="Accordion 2" name="2">
      <p>Opening this panel closes the other.</p>
    </stx-collapse-item>
    <stx-collapse-item title="Accordion 3" name="3">
      <p>Accordion mode restricts to a single open panel.</p>
    </stx-collapse-item>
  </stx-collapse>
</div>

```vue
<stx-collapse accordion>
  <stx-collapse-item title="Accordion 1" name="1">
    <p>Only one panel open at a time.</p>
  </stx-collapse-item>
  <stx-collapse-item title="Accordion 2" name="2">
    <p>Opening this closes the other.</p>
  </stx-collapse-item>
</stx-collapse>
```

## API

### Collapse Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string \| string[]` | — | Active panel names |
| `accordion` | `boolean` | `false` | Accordion mode (one panel at a time) |

### Collapse Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(activeNames: string \| string[])` | Triggered when active panels change |

### CollapseItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Panel header title |
| `name` | `string \| number` | — | Unique identifier |
| `disabled` | `boolean` | `false` | Disable toggling |

### CollapseItem Slots

| Slot | Description |
|------|-------------|
| `default` | Panel content |
| `title` | Custom header content |
