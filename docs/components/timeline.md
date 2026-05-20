# Timeline

Visually display a sequence of events in chronological order.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-timeline>
    <stx-timeline-item>Create project repository</stx-timeline-item>
    <stx-timeline-item>Initialize project structure</stx-timeline-item>
    <stx-timeline-item>Build core components</stx-timeline-item>
    <stx-timeline-item>Release v1.0</stx-timeline-item>
  </stx-timeline>
</div>

```vue
<stx-timeline>
  <stx-timeline-item>Create project repository</stx-timeline-item>
  <stx-timeline-item>Initialize project structure</stx-timeline-item>
  <stx-timeline-item>Build core components</stx-timeline-item>
  <stx-timeline-item>Release v1.0</stx-timeline-item>
</stx-timeline>
```

## Types & Timestamps

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-timeline>
    <stx-timeline-item type="primary" timestamp="2024-01-01">Project started</stx-timeline-item>
    <stx-timeline-item type="success" timestamp="2024-03-15">Alpha release</stx-timeline-item>
    <stx-timeline-item type="warning" timestamp="2024-06-01">Beta release</stx-timeline-item>
    <stx-timeline-item type="danger" timestamp="2024-09-01">Bug discovered</stx-timeline-item>
    <stx-timeline-item type="success" timestamp="2024-12-01">Stable release</stx-timeline-item>
  </stx-timeline>
</div>

```vue
<stx-timeline>
  <stx-timeline-item type="primary" timestamp="2024-01-01">Project started</stx-timeline-item>
  <stx-timeline-item type="success" timestamp="2024-03-15">Alpha release</stx-timeline-item>
  <stx-timeline-item type="warning" timestamp="2024-06-01">Beta release</stx-timeline-item>
  <stx-timeline-item type="danger" timestamp="2024-09-01">Bug discovered</stx-timeline-item>
  <stx-timeline-item type="success" timestamp="2024-12-01">Stable release</stx-timeline-item>
</stx-timeline>
```

## API

### Timeline Slots

| Slot | Description |
|------|-------------|
| `default` | Timeline items |

### TimelineItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Node type color |
| `color` | `string` | — | Custom node color |
| `size` | `'normal' \| 'large'` | `'normal'` | Node size |
| `hollow` | `boolean` | `false` | Hollow dot style |
| `timestamp` | `string` | — | Timestamp text |
| `placement` | `'top' \| 'bottom'` | `'bottom'` | Timestamp placement |

### TimelineItem Slots

| Slot | Description |
|------|-------------|
| `default` | Item content |
| `dot` | Custom node content |
