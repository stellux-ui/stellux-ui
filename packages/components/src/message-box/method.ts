import { createVNode, render } from 'vue'
import MessageBoxConstructor from './message-box.vue'
import type {
  MessageBoxOptions,
  MessageBoxData,
  MessageBoxFn,
  MessageBoxAction,
} from './message-box'

let currentInstance: any = null

function showMessageBox(options: MessageBoxOptions): Promise<MessageBoxData> {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div')

    const onAction = (action: MessageBoxAction, inputValue?: string) => {
      if (action === 'confirm') {
        resolve({ value: inputValue || '', action })
      } else {
        reject({ value: inputValue || '', action })
      }
      // Cleanup after transition completes
      setTimeout(() => {
        render(null, container)
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        currentInstance = null
      }, 250)
    }

    const props = {
      ...options,
      showClose: options.showClose ?? true,
      showConfirmButton: options.showConfirmButton ?? true,
      confirmButtonText: options.confirmButtonText ?? 'OK',
      cancelButtonText: options.cancelButtonText ?? 'Cancel',
      closeOnClickModal: options.closeOnClickModal ?? true,
      closeOnPressEscape: options.closeOnPressEscape ?? true,
      lockScroll: options.lockScroll ?? true,
      onAction,
    }

    const vnode = createVNode(MessageBoxConstructor, props)
    render(vnode, container)
    document.body.appendChild(container.firstElementChild || container)
    currentInstance = vnode
  })
}

const StxMessageBox: MessageBoxFn = Object.assign(
  (options: MessageBoxOptions) => showMessageBox(options),
  {
    alert: (
      message: string,
      title?: string,
      options?: Partial<MessageBoxOptions>
    ) =>
      showMessageBox({
        ...options,
        message,
        title: title || '',
        showCancelButton: false,
        closeOnClickModal: false,
      }),
    confirm: (
      message: string,
      title?: string,
      options?: Partial<MessageBoxOptions>
    ) =>
      showMessageBox({
        ...options,
        message,
        title: title || '',
        showCancelButton: true,
      }),
    prompt: (
      message: string,
      title?: string,
      options?: Partial<MessageBoxOptions>
    ) =>
      showMessageBox({
        ...options,
        message,
        title: title || '',
        showCancelButton: true,
        showInput: true,
      }),
    close: () => {
      currentInstance?.component?.exposed?.close()
    },
  }
)

export default StxMessageBox
