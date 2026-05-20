<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, type CSSProperties } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { backtopProps, backtopEmits } from './backtop'

defineOptions({ name: 'StxBacktop' })

const props = defineProps(backtopProps)
const emit = defineEmits(backtopEmits)

const ns = useNamespace('backtop')

const visible = ref(false)
let scrollContainer: HTMLElement | Window | undefined

function getScrollTarget(): HTMLElement | Window {
  if (props.target) {
    const el = document.querySelector<HTMLElement>(props.target)
    if (el) return el
  }
  return window
}

function getScrollTop(): number {
  if (!scrollContainer || scrollContainer instanceof Window) {
    return typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop) : 0
  }
  return scrollContainer.scrollTop
}

function handleScroll() {
  visible.value = getScrollTop() >= props.visibilityHeight
}

function handleClick(evt: MouseEvent) {
  if (!scrollContainer || scrollContainer instanceof Window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
  }
  emit('click', evt)
}

const buttonStyle = computed<CSSProperties>(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
}))

onMounted(() => {
  scrollContainer = getScrollTarget()
  scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  scrollContainer?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="stx-fade-in">
    <div
      v-show="visible"
      :class="ns.b()"
      :style="buttonStyle"
      @click.stop="handleClick"
    >
      <slot>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </slot>
    </div>
  </Transition>
</template>
