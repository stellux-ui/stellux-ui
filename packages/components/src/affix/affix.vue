<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, shallowRef, watch, type CSSProperties } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { affixProps, affixEmits } from './affix'

defineOptions({ name: 'StxAffix' })

const props = defineProps(affixProps)
const emit = defineEmits(affixEmits)

const ns = useNamespace('affix')

const rootRef = shallowRef<HTMLElement>()
const fixed = ref(false)
const placeholderStyle = ref<CSSProperties>({})
const affixStyle = ref<CSSProperties>({})

let scrollContainer: HTMLElement | Window | undefined
let targetEl: HTMLElement | undefined

function getTargetElement(): HTMLElement | undefined {
  if (!props.target) return undefined
  return document.querySelector<HTMLElement>(props.target) ?? undefined
}

function getScrollContainer(): HTMLElement | Window {
  if (targetEl) return targetEl
  return window
}

function getScrollTop(): number {
  if (!scrollContainer || scrollContainer instanceof Window) {
    return typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop) : 0
  }
  return scrollContainer.scrollTop
}

function update() {
  if (!rootRef.value) return

  const scrollTop = getScrollTop()
  const rootRect = rootRef.value.getBoundingClientRect()

  let shouldFix = false

  if (props.position === 'top') {
    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect()
      shouldFix = rootRect.top - props.offset < targetRect.top
        ? false
        : rootRect.top <= props.offset
    } else {
      shouldFix = rootRect.top <= props.offset
    }
  } else {
    const viewportHeight = window.innerHeight
    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect()
      shouldFix = rootRect.bottom + props.offset > targetRect.bottom
        ? false
        : rootRect.bottom >= viewportHeight - props.offset
    } else {
      shouldFix = rootRect.bottom >= viewportHeight - props.offset
    }
  }

  if (shouldFix) {
    placeholderStyle.value = {
      width: `${rootRect.width}px`,
      height: `${rootRect.height}px`,
    }

    const styles: CSSProperties = {
      position: 'fixed',
      width: `${rootRect.width}px`,
      zIndex: props.zIndex,
    }

    if (props.position === 'top') {
      styles.top = `${props.offset}px`
    } else {
      styles.bottom = `${props.offset}px`
    }

    affixStyle.value = styles
  } else {
    placeholderStyle.value = {}
    affixStyle.value = {}
  }

  if (fixed.value !== shouldFix) {
    fixed.value = shouldFix
    emit('change', shouldFix)
  }

  emit('scroll', { scrollTop, fixed: shouldFix })
}

function handleScroll() {
  update()
}

onMounted(() => {
  targetEl = getTargetElement()
  scrollContainer = getScrollContainer()
  scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  update()
})

onBeforeUnmount(() => {
  scrollContainer?.removeEventListener('scroll', handleScroll)
})

watch(() => [props.offset, props.position, props.target], () => {
  update()
})

defineExpose({ update, fixed })
</script>

<template>
  <div ref="rootRef" :class="ns.b()">
    <div :style="placeholderStyle">
      <div :class="{ [ns.m('fixed')]: fixed }" :style="affixStyle">
        <slot />
      </div>
    </div>
  </div>
</template>
