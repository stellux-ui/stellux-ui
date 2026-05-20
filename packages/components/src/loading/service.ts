import { createVNode, render } from 'vue'
import LoadingConstructor from './loading.vue'
import type { LoadingOptions, LoadingInstance } from './loading'

let fullscreenInstance: LoadingInstance | null = null

export function loadingService(
  options: LoadingOptions = {}
): LoadingInstance {
  if (options.fullscreen && fullscreenInstance) {
    return fullscreenInstance
  }

  const target = options.target
    ? typeof options.target === 'string'
      ? (document.querySelector(options.target) as HTMLElement)
      : options.target
    : document.body

  if (!target) {
    throw new Error('[StxLoading] target element not found')
  }

  const isFullscreen = options.fullscreen || target === document.body

  const container = document.createElement('div')
  const props = {
    text: options.text || '',
    background: options.background || '',
    fullscreen: isFullscreen,
    customClass: options.customClass || '',
  }

  const vnode = createVNode(LoadingConstructor, props)
  render(vnode, container)

  if (!isFullscreen) {
    const position = getComputedStyle(target).position
    if (position === 'static') {
      target.style.position = 'relative'
    }
  }

  target.appendChild(container.firstElementChild!)

  if (options.lock && isFullscreen) {
    document.body.style.overflow = 'hidden'
  }

  const instance: LoadingInstance = {
    close: () => {
      const selector = isFullscreen
        ? '.stx-loading.is-fullscreen'
        : '.stx-loading'
      const loadingEl = target.querySelector(selector)
      if (loadingEl) {
        target.removeChild(loadingEl)
      }
      render(null, container)
      if (options.lock && isFullscreen) {
        document.body.style.overflow = ''
      }
      if (isFullscreen) {
        fullscreenInstance = null
      }
    },
    setText: (text: string) => {
      const textEl = target.querySelector('.stx-loading__text')
      if (textEl) {
        textEl.textContent = text
      }
    },
  }

  if (isFullscreen) {
    fullscreenInstance = instance
  }

  return instance
}
