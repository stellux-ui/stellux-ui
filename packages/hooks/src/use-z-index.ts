import { ref } from 'vue'

const zIndex = ref(2000)

export function useZIndex() {
  const currentZIndex = ref(zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    currentZIndex.value = zIndex.value
    return currentZIndex.value
  }

  return { currentZIndex, nextZIndex, initialZIndex: 2000 }
}
