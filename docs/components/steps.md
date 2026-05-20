# Steps

Guide users through a multi-step process with a numbered progress indicator.

## Basic Usage

<div class="demo-block" style="flex-direction: column;">
  <stx-steps :active="1">
    <stx-step title="Step 1" description="Select a plan" />
    <stx-step title="Step 2" description="Enter details" />
    <stx-step title="Step 3" description="Payment" />
    <stx-step title="Step 4" description="Complete" />
  </stx-steps>
</div>

```vue
<stx-steps :active="1">
  <stx-step title="Step 1" description="Select a plan" />
  <stx-step title="Step 2" description="Enter details" />
  <stx-step title="Step 3" description="Payment" />
  <stx-step title="Step 4" description="Complete" />
</stx-steps>
```

## Center Aligned

<div class="demo-block" style="flex-direction: column;">
  <stx-steps :active="2" align-center>
    <stx-step title="Order Placed" />
    <stx-step title="Processing" />
    <stx-step title="Shipped" />
    <stx-step title="Delivered" />
  </stx-steps>
</div>

```vue
<stx-steps :active="2" align-center>
  <stx-step title="Order Placed" />
  <stx-step title="Processing" />
  <stx-step title="Shipped" />
  <stx-step title="Delivered" />
</stx-steps>
```

## Vertical

<div class="demo-block" style="flex-direction: column;">
  <stx-steps :active="1" direction="vertical" style="height: 300px;">
    <stx-step title="Step 1" description="Create account" />
    <stx-step title="Step 2" description="Verify email" />
    <stx-step title="Step 3" description="Set up profile" />
  </stx-steps>
</div>

```vue
<stx-steps :active="1" direction="vertical">
  <stx-step title="Step 1" description="Create account" />
  <stx-step title="Step 2" description="Verify email" />
  <stx-step title="Step 3" description="Set up profile" />
</stx-steps>
```

## Simple Mode

<div class="demo-block" style="flex-direction: column;">
  <stx-steps :active="1" simple>
    <stx-step title="Step 1" />
    <stx-step title="Step 2" />
    <stx-step title="Step 3" />
  </stx-steps>
</div>

```vue
<stx-steps :active="1" simple>
  <stx-step title="Step 1" />
  <stx-step title="Step 2" />
  <stx-step title="Step 3" />
</stx-steps>
```

## API

### Steps Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `number` | `0` | Current active step (zero-based) |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `processStatus` | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'process'` | Status of current step |
| `finishStatus` | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'finish'` | Status of finished steps |
| `alignCenter` | `boolean` | `false` | Center title and description |
| `space` | `number \| string` | `''` | Space between each step |
| `simple` | `boolean` | `false` | Simple style |

### Steps Slots

| Slot | Description |
|------|-------------|
| `default` | Step components |

### Step Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Step title |
| `description` | `string` | `''` | Step description |
| `icon` | `Component` | -- | Custom step icon |
| `status` | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `''` | Override step status |

### Step Slots

| Slot | Description |
|------|-------------|
| `icon` | Custom step icon |
| `title` | Custom step title |
| `description` | Custom step description |
