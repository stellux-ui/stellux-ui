# Result

Display a result status page for feedback after an operation.

## Basic Usage

<div class="demo-block" style="flex-direction: column; gap: 24px;">
  <stx-result type="success" title="Success" sub-title="Your operation was completed successfully." />
</div>

```vue
<stx-result type="success" title="Success" sub-title="Your operation was completed successfully." />
```

## Status Types

<div class="demo-block" style="flex-direction: column; gap: 24px;">
  <stx-result type="success" title="Success" sub-title="Operation succeeded" />
  <stx-result type="warning" title="Warning" sub-title="Something needs attention" />
  <stx-result type="info" title="Info" sub-title="Informational message" />
  <stx-result type="error" title="Error" sub-title="Something went wrong" />
</div>

```vue
<stx-result type="success" title="Success" sub-title="Operation succeeded" />
<stx-result type="warning" title="Warning" sub-title="Something needs attention" />
<stx-result type="info" title="Info" sub-title="Informational message" />
<stx-result type="error" title="Error" sub-title="Something went wrong" />
```

## With Actions

<div class="demo-block">
  <stx-result type="error" title="Submission Failed" sub-title="Please check your input and try again.">
    <template #extra>
      <stx-button type="primary">Try Again</stx-button>
      <stx-button>Go Back</stx-button>
    </template>
  </stx-result>
</div>

```vue
<stx-result type="error" title="Submission Failed" sub-title="Please check your input and try again.">
  <template #extra>
    <stx-button type="primary">Try Again</stx-button>
    <stx-button>Go Back</stx-button>
  </template>
</stx-result>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` | Result status type |
| `title` | `string` | — | Title text |
| `subTitle` | `string` | — | Sub-title text |
| `icon` | `Component` | — | Custom icon component |

### Slots

| Slot | Description |
|------|-------------|
| `icon` | Custom icon content |
| `title` | Custom title content |
| `sub-title` | Custom sub-title content |
| `extra` | Action buttons area |
