import { ref, watch, onBeforeUnmount, type Ref } from 'vue'

const FOCUSABLE_SELECTOR = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'textarea:not([disabled])', 'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])', '[contenteditable]',
].join(',')

export function useFocusTrap(containerRef: Ref<HTMLElement | undefined>, active: Ref<boolean>) {
  let lastFocusedElement: HTMLElement | null = null

  const getFocusableElements = () => {
    const container = containerRef.value
    if (!container) return []
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const focusable = getFocusableElements()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  watch(active, (isActive) => {
    if (isActive) {
      lastFocusedElement = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleKeyDown)
      requestAnimationFrame(() => {
        const focusable = getFocusableElements()
        if (focusable.length > 0) focusable[0].focus()
      })
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      lastFocusedElement?.focus()
      lastFocusedElement = null
    }
  }, { immediate: true })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
    lastFocusedElement?.focus()
  })
}
