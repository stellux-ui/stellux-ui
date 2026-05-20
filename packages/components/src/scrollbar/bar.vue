<script setup lang="ts">
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { scrollbarContextKey } from './constants'

defineOptions({ name: 'StxScrollbarBar' })

const props = withDefaults(
  defineProps<{
    always?: boolean
    minSize?: number
    direction: 'vertical' | 'horizontal'
  }>(),
  { always: false, minSize: 20 },
)

const ns = useNamespace('scrollbar')
const ctx = inject(scrollbarContextKey)!

const visible = ref(false)
const thumbRef = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()

const isVertical = computed(() => props.direction === 'vertical')

const thumbSizePercent = ref(0)
const thumbOffsetPercent = ref(0)

let isDragging = false
let dragStart = 0
let scrollStart = 0

const update = () => {
  const wrap = ctx.wrapRef.value
  if (!wrap) return

  if (isVertical.value) {
    const ratio = wrap.clientHeight / wrap.scrollHeight
    thumbSizePercent.value =
      ratio >= 1
        ? 0
        : Math.max(ratio * 100, (props.minSize / wrap.clientHeight) * 100)
    if (wrap.scrollHeight > wrap.clientHeight) {
      const maxScroll = wrap.scrollHeight - wrap.clientHeight
      thumbOffsetPercent.value =
        maxScroll > 0
          ? (wrap.scrollTop / maxScroll) *
            (100 - thumbSizePercent.value)
          : 0
    } else {
      thumbOffsetPercent.value = 0
    }
  } else {
    const ratio = wrap.clientWidth / wrap.scrollWidth
    thumbSizePercent.value =
      ratio >= 1
        ? 0
        : Math.max(ratio * 100, (props.minSize / wrap.clientWidth) * 100)
    if (wrap.scrollWidth > wrap.clientWidth) {
      const maxScroll = wrap.scrollWidth - wrap.clientWidth
      thumbOffsetPercent.value =
        maxScroll > 0
          ? (wrap.scrollLeft / maxScroll) *
            (100 - thumbSizePercent.value)
          : 0
    } else {
      thumbOffsetPercent.value = 0
    }
  }
}

const handleScroll = () => update()

const startDrag = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging = true
  const wrap = ctx.wrapRef.value!
  dragStart = isVertical.value ? e.clientY : e.clientX
  scrollStart = isVertical.value ? wrap.scrollTop : wrap.scrollLeft
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.body.style.userSelect = 'none'
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging) return
  const wrap = ctx.wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return

  const delta = (isVertical.value ? e.clientY : e.clientX) - dragStart
  const trackSize = isVertical.value ? track.clientHeight : track.clientWidth
  const thumbSize = (thumbSizePercent.value / 100) * trackSize
  const availableTrack = trackSize - thumbSize
  const scrollRange = isVertical.value
    ? wrap.scrollHeight - wrap.clientHeight
    : wrap.scrollWidth - wrap.clientWidth

  if (availableTrack <= 0) return

  const scrollDelta = (delta / availableTrack) * scrollRange

  if (isVertical.value) {
    wrap.scrollTop = scrollStart + scrollDelta
  } else {
    wrap.scrollLeft = scrollStart + scrollDelta
  }
}

const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.body.style.userSelect = ''
}

const handleTrackClick = (e: MouseEvent) => {
  if (e.target === thumbRef.value) return
  const wrap = ctx.wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return

  const rect = track.getBoundingClientRect()
  const offset = isVertical.value ? e.clientY - rect.top : e.clientX - rect.left
  const trackSize = isVertical.value ? track.clientHeight : track.clientWidth
  const ratio = offset / trackSize

  if (isVertical.value) {
    wrap.scrollTop = ratio * wrap.scrollHeight - wrap.clientHeight / 2
  } else {
    wrap.scrollLeft = ratio * wrap.scrollWidth - wrap.clientWidth / 2
  }
}

const thumbStyle = computed(() => {
  if (thumbSizePercent.value <= 0) return { display: 'none' }
  return isVertical.value
    ? {
        height: `${thumbSizePercent.value}%`,
        transform: `translateY(${thumbOffsetPercent.value}%)`,
      }
    : {
        width: `${thumbSizePercent.value}%`,
        transform: `translateX(${thumbOffsetPercent.value}%)`,
      }
})

onMounted(() => {
  const wrap = ctx.wrapRef.value
  if (wrap) {
    wrap.addEventListener('scroll', handleScroll)
    update()
  }
})

onBeforeUnmount(() => {
  ctx.wrapRef.value?.removeEventListener('scroll', handleScroll)
  stopDrag()
})

defineExpose({ update })
</script>

<template>
  <transition name="stx-fade-in-linear">
    <div
      v-show="always || visible"
      ref="trackRef"
      :class="[
        ns.e('bar'),
        ns.is('vertical', isVertical),
        ns.is('horizontal', !isVertical),
      ]"
      @mouseenter="visible = true"
      @mouseleave="visible = false"
      @mousedown="handleTrackClick"
    >
      <div
        ref="thumbRef"
        :class="ns.e('thumb')"
        :style="thumbStyle"
        @mousedown="startDrag"
      />
    </div>
  </transition>
</template>
