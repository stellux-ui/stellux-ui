import type { Directive, DirectiveBinding } from 'vue'
import { createVNode, render } from 'vue'
import LoadingConstructor from './loading.vue'

const LOADING_KEY = Symbol('loading')

interface LoadingEl extends HTMLElement {
  [LOADING_KEY]?: {
    container: HTMLDivElement
    vnode: ReturnType<typeof createVNode>
  }
}

function createLoadingInstance(el: LoadingEl, binding: DirectiveBinding) {
  const container = document.createElement('div')
  const props = {
    text: el.getAttribute('stx-loading-text') || '',
    background: el.getAttribute('stx-loading-background') || '',
    fullscreen: false,
  }

  const vnode = createVNode(LoadingConstructor, props)
  render(vnode, container)

  // Position the parent as relative if not already positioned
  const position = getComputedStyle(el).position
  if (position === 'static') {
    el.style.position = 'relative'
  }

  el.appendChild(container.firstElementChild!)
  el[LOADING_KEY] = { container, vnode }
}

function removeLoadingInstance(el: LoadingEl) {
  const instance = el[LOADING_KEY]
  if (instance) {
    const loadingEl = el.querySelector('.stx-loading')
    if (loadingEl) {
      el.removeChild(loadingEl)
    }
    render(null, instance.container)
    delete el[LOADING_KEY]
  }
}

export const vLoading: Directive = {
  mounted(el: LoadingEl, binding: DirectiveBinding) {
    if (binding.value) {
      createLoadingInstance(el, binding)
    }
  },
  updated(el: LoadingEl, binding: DirectiveBinding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        createLoadingInstance(el, binding)
      } else {
        removeLoadingInstance(el)
      }
    }
  },
  unmounted(el: LoadingEl) {
    removeLoadingInstance(el)
  },
}
