<script setup lang="ts">
import { provide, ref, onMounted, onBeforeUnmount, watch, nextTick, shallowRef, type CSSProperties, computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { anchorProps, anchorEmits } from './anchor'
import { anchorContextKey } from './constants'

defineOptions({ name: 'StxAnchor' })

const props = defineProps(anchorProps)
const emit = defineEmits(anchorEmits)

const ns = useNamespace('anchor')

const activeHref = ref('')
const links = ref<string[]>([])
const markerRef = shallowRef<HTMLElement>()
const navRef = shallowRef<HTMLElement>()
let scrollContainer: HTMLElement | Window = window
let isScrolling = false

function getScrollContainer(): HTMLElement | Window {
  if (!props.container) return window
  if (typeof props.container === 'string') {
    return document.querySelector<HTMLElement>(props.container) ?? window
  }
  return props.container as HTMLElement | Window
}

function getScrollTop(): number {
  if (scrollContainer instanceof Window) {
    return window.scrollY || document.documentElement.scrollTop
  }
  return scrollContainer.scrollTop
}

function getOffsetTop(el: HTMLElement): number {
  if (scrollContainer instanceof Window) {
    return el.getBoundingClientRect().top + window.scrollY
  }
  return el.getBoundingClientRect().top - (scrollContainer as HTMLElement).getBoundingClientRect().top + (scrollContainer as HTMLElement).scrollTop
}

function registerLink(href: string) {
  if (!links.value.includes(href)) {
    links.value.push(href)
  }
}

function unregisterLink(href: string) {
  const idx = links.value.indexOf(href)
  if (idx !== -1) {
    links.value.splice(idx, 1)
  }
}

function updateActiveLink() {
  if (isScrolling) return
  const scrollTop = getScrollTop()
  let currentHref = ''

  for (const href of links.value) {
    const target = document.querySelector<HTMLElement>(href)
    if (!target) continue
    const top = getOffsetTop(target)
    if (top <= scrollTop + props.offset + props.bound) {
      currentHref = href
    }
  }

  if (currentHref && currentHref !== activeHref.value) {
    activeHref.value = currentHref
    emit('change', currentHref)
  }
}

function scrollToHref(href: string) {
  const target = document.querySelector<HTMLElement>(href)
  if (!target) return

  isScrolling = true
  const targetTop = getOffsetTop(target) - props.offset

  if (scrollContainer instanceof Window) {
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  } else {
    scrollContainer.scrollTo({ top: targetTop, behavior: 'smooth' })
  }

  setTimeout(() => {
    isScrolling = false
  }, props.duration + 50)
}

function handleLinkClick(evt: MouseEvent, href: string) {
  evt.preventDefault()
  emit('click', evt, href)
  activeHref.value = href
  emit('change', href)
  scrollToHref(href)
}

function updateMarker() {
  if (!props.marker || !navRef.value || !markerRef.value) return

  const activeEl = navRef.value.querySelector<HTMLElement>(`.is-active`)
  if (!activeEl) {
    markerRef.value.style.opacity = '0'
    return
  }

  markerRef.value.style.opacity = '1'

  if (props.direction === 'vertical') {
    const top = activeEl.offsetTop
    markerRef.value.style.top = `${top}px`
    markerRef.value.style.height = `${activeEl.offsetHeight}px`
  } else {
    const left = activeEl.offsetLeft
    markerRef.value.style.left = `${left}px`
    markerRef.value.style.width = `${activeEl.offsetWidth}px`
  }
}

function handleScroll() {
  updateActiveLink()
}

watch(activeHref, () => {
  nextTick(() => {
    updateMarker()
  })
})

provide(anchorContextKey, {
  activeHref,
  handleLinkClick,
  registerLink,
  unregisterLink,
})

onMounted(() => {
  scrollContainer = getScrollContainer()
  scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  updateActiveLink()
  nextTick(() => updateMarker())
})

onBeforeUnmount(() => {
  scrollContainer.removeEventListener('scroll', handleScroll)
})

defineExpose({ activeHref })
</script>

<template>
  <div
    ref="navRef"
    :class="[
      ns.b(),
      ns.m(direction),
      ns.m(type),
    ]"
  >
    <div v-if="marker" ref="markerRef" :class="ns.e('marker')" />
    <slot />
  </div>
</template>
