import { createVNode, render, shallowReactive } from 'vue'
import { useZIndex } from '@stellux/hooks'
import NotificationConstructor from './notification.vue'
import type {
  NotificationOptions,
  NotificationHandler,
  NotificationFn,
  NotificationPosition,
} from './notification'

let seed = 0

interface NotificationInstance {
  id: string
  vm: ReturnType<typeof createVNode>
  handler: NotificationHandler
  container: HTMLDivElement
  position: NotificationPosition
}

// Separate stacks for each corner position
const instancesMap: Record<NotificationPosition, NotificationInstance[]> = {
  'top-right': shallowReactive([]),
  'top-left': shallowReactive([]),
  'bottom-right': shallowReactive([]),
  'bottom-left': shallowReactive([]),
}

const { nextZIndex } = useZIndex()

function getVerticalOffset(position: NotificationPosition, offset: number): number {
  const instances = instancesMap[position]
  let verticalOffset = offset
  for (const inst of instances) {
    const el = inst.vm.el as HTMLElement | null
    if (el) {
      verticalOffset += el.offsetHeight + 16
    }
  }
  return verticalOffset
}

function createNotification(options: NotificationOptions | string): NotificationHandler {
  if (typeof options === 'string') {
    options = { message: options }
  }

  const id = `stx-notification-${seed++}`
  const container = document.createElement('div')
  const position: NotificationPosition = options.position ?? 'top-right'
  const instances = instancesMap[position]

  const userOnClose = options.onClose
  const baseOffset = options.offset ?? 16
  const verticalOffset = getVerticalOffset(position, baseOffset)

  const props = {
    ...options,
    id,
    position,
    zIndex: nextZIndex(),
    offset: verticalOffset,
    onClose: () => {
      closeNotification(id, position)
      userOnClose?.()
    },
    onDestroy: () => {
      render(null, container)
    },
  }

  const vnode = createVNode(NotificationConstructor, props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const handler: NotificationHandler = {
    close: () => {
      vnode.component?.exposed?.close()
    },
  }

  instances.push({ id, vm: vnode, handler, container, position })
  return handler
}

function closeNotification(id: string, position: NotificationPosition) {
  const instances = instancesMap[position]
  const idx = instances.findIndex((inst) => inst.id === id)
  if (idx === -1) return

  const removedEl = instances[idx].vm.el as HTMLElement | null
  const removedHeight = removedEl?.offsetHeight ?? 0
  instances.splice(idx, 1)

  const isTop = position.includes('top')
  const verticalProp = isTop ? 'top' : 'bottom'

  // Update positions of notifications below/above the removed one
  for (let i = idx; i < instances.length; i++) {
    const el = instances[i].vm.el as HTMLElement | null
    if (el) {
      const currentOffset = parseInt(el.style[verticalProp], 10)
      el.style[verticalProp] = `${currentOffset - removedHeight - 16}px`
    }
  }
}

const StxNotification: NotificationFn = createNotification as NotificationFn

StxNotification.success = (options) =>
  createNotification(
    typeof options === 'string'
      ? { message: options, type: 'success' }
      : { ...options, type: 'success' }
  )

StxNotification.warning = (options) =>
  createNotification(
    typeof options === 'string'
      ? { message: options, type: 'warning' }
      : { ...options, type: 'warning' }
  )

StxNotification.info = (options) =>
  createNotification(
    typeof options === 'string'
      ? { message: options, type: 'info' }
      : { ...options, type: 'info' }
  )

StxNotification.error = (options) =>
  createNotification(
    typeof options === 'string'
      ? { message: options, type: 'error' }
      : { ...options, type: 'error' }
  )

StxNotification.closeAll = () => {
  const positions: NotificationPosition[] = [
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
  ]
  for (const position of positions) {
    const instances = instancesMap[position]
    for (let i = instances.length - 1; i >= 0; i--) {
      instances[i].handler.close()
    }
  }
}

export default StxNotification
