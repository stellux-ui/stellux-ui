import type { Directive, DirectiveBinding } from 'vue'

const SCOPE = 'StxInfiniteScroll'

interface InfiniteScrollEl extends HTMLElement {
  [SCOPE]: {
    observer?: IntersectionObserver
    container: HTMLElement | Window
    onScroll: () => void
    delay: number
    disabled: boolean
    distance: number
    cb: () => void
  }
}

function getScrollContainer(el: HTMLElement): HTMLElement | Window {
  let parent = el.parentElement
  while (parent) {
    if (/(auto|scroll)/.test(getComputedStyle(parent).overflowY)) return parent
    parent = parent.parentElement
  }
  return window
}

function handleScroll(el: InfiniteScrollEl) {
  const { container, distance, disabled, cb } = el[SCOPE]
  if (disabled) return

  let scrollTop: number, clientHeight: number, scrollHeight: number
  if (container === window) {
    scrollTop = document.documentElement.scrollTop
    clientHeight = document.documentElement.clientHeight
    scrollHeight = document.documentElement.scrollHeight
  } else {
    const c = container as HTMLElement
    scrollTop = c.scrollTop
    clientHeight = c.clientHeight
    scrollHeight = c.scrollHeight
  }

  if (scrollHeight - scrollTop - clientHeight <= distance) {
    cb()
  }
}

export const vInfiniteScroll: Directive = {
  mounted(el: InfiniteScrollEl, binding: DirectiveBinding) {
    const cb = binding.value
    if (typeof cb !== 'function') return

    const disabled = el.getAttribute('infinite-scroll-disabled') === 'true'
    const delay = Number(el.getAttribute('infinite-scroll-delay')) || 200
    const distance = Number(el.getAttribute('infinite-scroll-distance')) || 0
    const immediate = el.getAttribute('infinite-scroll-immediate') !== 'false'

    const container = getScrollContainer(el)

    let timer: ReturnType<typeof setTimeout> | null = null
    const onScroll = () => {
      if (timer) return
      timer = setTimeout(() => {
        handleScroll(el)
        timer = null
      }, delay)
    }

    el[SCOPE] = { container, onScroll, delay, disabled, distance, cb }

    if (container === window) {
      window.addEventListener('scroll', onScroll)
    } else {
      ;(container as HTMLElement).addEventListener('scroll', onScroll)
    }

    if (immediate) {
      handleScroll(el)
    }
  },

  updated(el: InfiniteScrollEl, binding: DirectiveBinding) {
    el[SCOPE].cb = binding.value
    el[SCOPE].disabled = el.getAttribute('infinite-scroll-disabled') === 'true'
  },

  unmounted(el: InfiniteScrollEl) {
    const { container, onScroll } = el[SCOPE]
    if (container === window) {
      window.removeEventListener('scroll', onScroll)
    } else {
      ;(container as HTMLElement).removeEventListener('scroll', onScroll)
    }
  },
}
