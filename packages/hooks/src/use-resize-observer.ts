import { watch, onBeforeUnmount, type Ref } from 'vue'

export function useResizeObserver(
  target: Ref<HTMLElement | undefined>,
  callback: ResizeObserverCallback,
) {
  let observer: ResizeObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const stopWatch = watch(
    () => target.value,
    (el) => {
      cleanup()
      if (el) {
        observer = new ResizeObserver(callback)
        observer.observe(el)
      }
    },
    { immediate: true, flush: 'post' },
  )

  onBeforeUnmount(() => {
    stopWatch()
    cleanup()
  })

  return { stop: () => { stopWatch(); cleanup() } }
}
