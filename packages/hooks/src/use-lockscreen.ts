import { watch, onBeforeUnmount, type Ref } from 'vue'

let lockCount = 0
let originalOverflow = ''

export function useLockscreen(active: Ref<boolean>) {
  const lock = () => {
    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount++
  }

  const unlock = () => {
    lockCount--
    if (lockCount <= 0) {
      lockCount = 0
      document.body.style.overflow = originalOverflow
    }
  }

  watch(active, (isActive) => {
    if (isActive) lock()
    else unlock()
  }, { immediate: true })

  onBeforeUnmount(() => {
    if (active.value) unlock()
  })
}
