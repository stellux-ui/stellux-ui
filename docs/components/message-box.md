# MessageBox

A modal dialog for confirmations, alerts, and prompts. Returns a Promise.

## Usage

```typescript
import { StxMessageBox } from 'stellux-ui'

// Alert
StxMessageBox.alert('This is an alert', 'Alert Title')

// Confirm
StxMessageBox.confirm('Are you sure?', 'Confirm')
  .then(() => {
    console.log('confirmed')
  })
  .catch(() => {
    console.log('cancelled')
  })

// Prompt
StxMessageBox.prompt('Enter your name', 'Prompt')
  .then(({ value }) => {
    console.log('Input:', value)
  })
```

## With Options

```typescript
import { StxMessageBox } from 'stellux-ui'

StxMessageBox.confirm('This action is irreversible. Continue?', 'Warning', {
  type: 'warning',
  confirmButtonText: 'Delete',
  cancelButtonText: 'Keep',
  closeOnClickModal: false,
})
```

## Input Validation

```typescript
import { StxMessageBox } from 'stellux-ui'

StxMessageBox.prompt('Enter your email', 'Validation', {
  inputPattern: /^[\w.-]+@[\w.-]+\.\w+$/,
  inputErrorMessage: 'Invalid email address',
  inputPlaceholder: 'user@example.com',
})
```

## API

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `StxMessageBox(options)` | `MessageBoxOptions` | `Promise<MessageBoxData>` | Show a message box |
| `StxMessageBox.alert(message, title?, options?)` | `string \| VNode, string, options` | `Promise<MessageBoxData>` | Show an alert |
| `StxMessageBox.confirm(message, title?, options?)` | `string \| VNode, string, options` | `Promise<MessageBoxData>` | Show a confirm dialog |
| `StxMessageBox.prompt(message, title?, options?)` | `string \| VNode, string, options` | `Promise<MessageBoxData>` | Show a prompt dialog |
| `StxMessageBox.close()` | -- | -- | Close the current message box |

### MessageBoxOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | -- | Dialog title |
| `message` | `string \| VNode` | -- | Dialog message content |
| `type` | `'' \| 'success' \| 'warning' \| 'info' \| 'error'` | `''` | Icon type |
| `icon` | `Component` | -- | Custom icon |
| `showClose` | `boolean` | `true` | Show close button |
| `showCancelButton` | `boolean` | `false` | Show cancel button |
| `showConfirmButton` | `boolean` | `true` | Show confirm button |
| `confirmButtonText` | `string` | `'OK'` | Confirm button text |
| `cancelButtonText` | `string` | `'Cancel'` | Cancel button text |
| `closeOnClickModal` | `boolean` | `true` | Close on overlay click |
| `closeOnPressEscape` | `boolean` | `true` | Close on Escape key |
| `distinguishCancelAndClose` | `boolean` | `false` | Distinguish cancel from close actions |
| `lockScroll` | `boolean` | `true` | Lock body scroll |
| `showInput` | `boolean` | `false` | Show input field (for prompt) |
| `inputPlaceholder` | `string` | -- | Input placeholder |
| `inputValue` | `string` | -- | Initial input value |
| `inputType` | `string` | `'text'` | Input type |
| `inputPattern` | `RegExp` | -- | Input validation pattern |
| `inputErrorMessage` | `string` | -- | Error message for validation |
| `beforeClose` | `(action, done) => void` | -- | Callback before closing |

### MessageBoxData

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | Input value (for prompt) |
| `action` | `'confirm' \| 'cancel' \| 'close'` | Action that closed the box |
