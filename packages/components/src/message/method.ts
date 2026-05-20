import { createVNode, render, shallowReactive } from 'vue'
import { useZIndex } from '@stellux/hooks'
import MessageConstructor from './message.vue'
import type { MessageOptions, MessageHandler, MessageFn } from './message'

let seed = 0

interface MessageInstance {
  id: string
  vm: ReturnType<typeof createVNode>
  handler: MessageHandler
  container: HTMLDivElement
}

const instances: MessageInstance[] = shallowReactive([])

const { nextZIndex } = useZIndex()

function getVerticalOffset(offset: number): number {
  let verticalOffset = offset
  for (const inst of instances) {
    const el = inst.vm.el as HTMLElement | null
    if (el) {
      verticalOffset += el.offsetHeight + 16
    }
  }
  return verticalOffset
}

function createMessage(options: MessageOptions | string): MessageHandler {
  if (typeof options === 'string') {
    options = { message: options }
  }

  const id = `stx-message-${seed++}`
  const container = document.createElement('div')

  const userOnClose = options.onClose
  const baseOffset = options.offset ?? 16
  const verticalOffset = getVerticalOffset(baseOffset)

  const props = {
    ...options,
    id,
    zIndex: nextZIndex(),
    offset: verticalOffset,
    onClose: () => {
      closeMessage(id)
      userOnClose?.()
    },
    onDestroy: () => {
      render(null, container)
    },
  }

  const vnode = createVNode(MessageConstructor, props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const handler: MessageHandler = {
    close: () => {
      vnode.component?.exposed?.close()
    },
  }

  instances.push({ id, vm: vnode, handler, container })
  return handler
}

function closeMessage(id: string) {
  const idx = instances.findIndex((inst) => inst.id === id)
  if (idx === -1) return

  const removedEl = instances[idx].vm.el as HTMLElement | null
  const removedHeight = removedEl?.offsetHeight ?? 0
  instances.splice(idx, 1)

  // Update positions of messages below the removed one
  for (let i = idx; i < instances.length; i++) {
    const el = instances[i].vm.el as HTMLElement | null
    if (el) {
      const currentTop = parseInt(el.style.top, 10)
      el.style.top = `${currentTop - removedHeight - 16}px`
    }
  }
}

const StxMessage: MessageFn = createMessage as MessageFn

StxMessage.success = (options) =>
  createMessage(
    typeof options === 'string'
      ? { message: options, type: 'success' }
      : { ...options, type: 'success' }
  )

StxMessage.warning = (options) =>
  createMessage(
    typeof options === 'string'
      ? { message: options, type: 'warning' }
      : { ...options, type: 'warning' }
  )

StxMessage.info = (options) =>
  createMessage(
    typeof options === 'string'
      ? { message: options, type: 'info' }
      : { ...options, type: 'info' }
  )

StxMessage.error = (options) =>
  createMessage(
    typeof options === 'string'
      ? { message: options, type: 'error' }
      : { ...options, type: 'error' }
  )

StxMessage.closeAll = () => {
  // Close in reverse order to avoid index shifting issues
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].handler.close()
  }
}

export default StxMessage
