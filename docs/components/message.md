# Message

A lightweight feedback message that appears at the top of the page.

## Usage

```typescript
import { StxMessage } from 'stellux-ui'

StxMessage.success('Operation succeeded!')
StxMessage.warning('This is a warning')
StxMessage.info('Informational message')
StxMessage.error('Something went wrong')
```

## Options

```typescript
import { StxMessage } from 'stellux-ui'

StxMessage({
  message: 'Custom message with options',
  type: 'success',
  duration: 5000,
  showClose: true,
  center: true,
})
```

## Close Programmatically

```typescript
import { StxMessage } from 'stellux-ui'

const handler = StxMessage.success('Loading...')

// Close after some async operation
setTimeout(() => {
  handler.close()
}, 2000)
```

## Close All

```typescript
import { StxMessage } from 'stellux-ui'

StxMessage.closeAll()
```

## API

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `StxMessage(options)` | `MessageOptions \| string` | Show a message |
| `StxMessage.success(options)` | `MessageOptions \| string` | Show a success message |
| `StxMessage.warning(options)` | `MessageOptions \| string` | Show a warning message |
| `StxMessage.info(options)` | `MessageOptions \| string` | Show an info message |
| `StxMessage.error(options)` | `MessageOptions \| string` | Show an error message |
| `StxMessage.closeAll()` | -- | Close all messages |

### MessageOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `message` | `string \| VNode` | -- | Message content |
| `type` | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` | Message type |
| `icon` | `Component` | -- | Custom icon |
| `duration` | `number` | `3000` | Auto-close delay in ms, 0 to disable |
| `showClose` | `boolean` | `false` | Show close button |
| `center` | `boolean` | `false` | Center the text |
| `offset` | `number` | `16` | Vertical offset from top in px |
| `onClose` | `() => void` | -- | Callback when message closes |
| `grouping` | `boolean` | `false` | Merge identical messages |

### MessageHandler

| Method | Description |
|--------|-------------|
| `close()` | Close the message instance |
