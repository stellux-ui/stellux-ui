# Notification

A notification message that appears in a corner of the page.

## Usage

```typescript
import { StxNotification } from 'stellux-ui'

StxNotification({
  title: 'Title',
  message: 'This is a notification message',
})

StxNotification.success({
  title: 'Success',
  message: 'Operation completed successfully',
})

StxNotification.error({
  title: 'Error',
  message: 'An error occurred',
})
```

## Types

```typescript
import { StxNotification } from 'stellux-ui'

StxNotification.success({ title: 'Success', message: 'Well done!' })
StxNotification.warning({ title: 'Warning', message: 'Be careful.' })
StxNotification.info({ title: 'Info', message: 'Something happened.' })
StxNotification.error({ title: 'Error', message: 'Something failed.' })
```

## Position

```typescript
import { StxNotification } from 'stellux-ui'

StxNotification({ title: 'Top Right', message: 'Default', position: 'top-right' })
StxNotification({ title: 'Top Left', message: 'Top left corner', position: 'top-left' })
StxNotification({ title: 'Bottom Right', message: 'Bottom right', position: 'bottom-right' })
StxNotification({ title: 'Bottom Left', message: 'Bottom left', position: 'bottom-left' })
```

## Close All

```typescript
import { StxNotification } from 'stellux-ui'

StxNotification.closeAll()
```

## API

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `StxNotification(options)` | `NotificationOptions \| string` | Show a notification |
| `StxNotification.success(options)` | `NotificationOptions \| string` | Show a success notification |
| `StxNotification.warning(options)` | `NotificationOptions \| string` | Show a warning notification |
| `StxNotification.info(options)` | `NotificationOptions \| string` | Show an info notification |
| `StxNotification.error(options)` | `NotificationOptions \| string` | Show an error notification |
| `StxNotification.closeAll()` | -- | Close all notifications |

### NotificationOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `''` | Notification title |
| `message` | `string \| VNode` | -- | Notification content |
| `type` | `'success' \| 'warning' \| 'info' \| 'error' \| ''` | `''` | Notification type |
| `icon` | `Component` | -- | Custom icon |
| `duration` | `number` | `4500` | Auto-close delay in ms, 0 to disable |
| `showClose` | `boolean` | `true` | Show close button |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Position on screen |
| `offset` | `number` | `16` | Offset from the edge in px |
| `onClick` | `() => void` | -- | Callback on click |
| `onClose` | `() => void` | -- | Callback when closed |

### NotificationHandler

| Method | Description |
|--------|-------------|
| `close()` | Close the notification instance |
