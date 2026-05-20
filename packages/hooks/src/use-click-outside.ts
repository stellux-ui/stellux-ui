import { onBeforeUnmount, type Ref } from 'vue'

export function useClickOutside(
  targets: Ref<HTMLElement | undefined> | Ref<HTMLElement | undefined>[],
  handler: (event: PointerEvent) => void,
) {
  if (typeof document === 'undefined') return { stop: () => {} }

  const targetRefs = Array.isArray(targets) ? targets : [targets]

  const listener = (event: PointerEvent) => {
    const composedPath = event.composedPath()
    const isOutside = targetRefs.every((target) => {
      const el = target.value
      return el && !composedPath.includes(el)
    })
    if (isOutside) handler(event)
  }

  document.addEventListener('pointerdown', listener)

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', listener)
  })

  return {
    stop: () => document.removeEventListener('pointerdown', listener),
  }
}
