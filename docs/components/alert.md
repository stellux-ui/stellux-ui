# Alert

Display important alert messages to the user.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%; gap: 12px;">
  <stx-alert title="Success alert" type="success" />
  <stx-alert title="Info alert" type="info" />
  <stx-alert title="Warning alert" type="warning" />
  <stx-alert title="Error alert" type="error" />
</div>

```vue
<stx-alert title="Success alert" type="success" />
<stx-alert title="Info alert" type="info" />
<stx-alert title="Warning alert" type="warning" />
<stx-alert title="Error alert" type="error" />
```

## With Icon

<div class="demo-block" style="flex-direction: column; width: 100%; gap: 12px;">
  <stx-alert title="Success alert" type="success" show-icon />
  <stx-alert title="Info alert" type="info" show-icon />
  <stx-alert title="Warning alert" type="warning" show-icon />
  <stx-alert title="Error alert" type="error" show-icon />
</div>

```vue
<stx-alert title="Success alert" type="success" show-icon />
<stx-alert title="Info alert" type="info" show-icon />
<stx-alert title="Warning alert" type="warning" show-icon />
<stx-alert title="Error alert" type="error" show-icon />
```

## Description

<div class="demo-block" style="flex-direction: column; width: 100%; gap: 12px;">
  <stx-alert title="With description" type="success" description="This is a description of the success alert with additional details." show-icon />
  <stx-alert title="With description" type="warning" description="This is a description of the warning alert with additional details." show-icon />
</div>

```vue
<stx-alert
  title="With description"
  type="success"
  description="This is a description of the success alert."
  show-icon
/>
```

## Closable

<div class="demo-block" style="flex-direction: column; width: 100%; gap: 12px;">
  <stx-alert title="Closable alert" type="info" closable show-icon />
  <stx-alert title="Not closable" type="warning" :closable="false" show-icon />
  <stx-alert title="Custom close text" type="success" close-text="Got it" show-icon />
</div>

```vue
<stx-alert title="Closable alert" type="info" closable show-icon />
<stx-alert title="Not closable" type="warning" :closable="false" />
<stx-alert title="Custom close text" type="success" close-text="Got it" />
```

## Dark Effect

<div class="demo-block" style="flex-direction: column; width: 100%; gap: 12px;">
  <stx-alert title="Success" type="success" effect="dark" show-icon />
  <stx-alert title="Info" type="info" effect="dark" show-icon />
  <stx-alert title="Warning" type="warning" effect="dark" show-icon />
  <stx-alert title="Error" type="error" effect="dark" show-icon />
</div>

```vue
<stx-alert title="Success" type="success" effect="dark" show-icon />
<stx-alert title="Info" type="info" effect="dark" show-icon />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` | Alert type |
| `title` | `string` | `''` | Alert title |
| `description` | `string` | `''` | Supplementary description text |
| `closable` | `boolean` | `true` | Show close button |
| `closeText` | `string` | `''` | Custom close button text |
| `showIcon` | `boolean` | `false` | Show type icon |
| `center` | `boolean` | `false` | Center text |
| `effect` | `'light' \| 'dark'` | `'light'` | Theme style |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `close` | `(event: MouseEvent)` | Triggered when alert is closed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Alert content (overrides description) |
| `title` | Alert title content |
