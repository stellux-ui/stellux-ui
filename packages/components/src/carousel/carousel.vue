<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  toRef,
  watch,
} from 'vue'
import { useNamespace } from '@stellux/hooks'
import { carouselProps, carouselEmits } from './carousel'
import { carouselContextKey, type CarouselContext } from './constants'

defineOptions({ name: 'StxCarousel' })

const props = defineProps(carouselProps)
const emit = defineEmits(carouselEmits)

const ns = useNamespace('carousel')

// State
const activeIndex = ref(props.initialIndex)
const hovering = ref(false)
const items = ref<number[]>([])
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const itemCount = computed(() => items.value.length)

// Item registration
function addItem(uid: number) {
  items.value.push(uid)
}

function removeItem(uid: number) {
  const idx = items.value.indexOf(uid)
  if (idx !== -1) {
    items.value.splice(idx, 1)
  }
}

// Navigation
function setActiveItem(index: number) {
  const count = itemCount.value
  if (count === 0) return

  const prev = activeIndex.value
  let next = index

  if (props.loop) {
    if (next < 0) next = count - 1
    if (next >= count) next = 0
  } else {
    next = Math.max(0, Math.min(next, count - 1))
  }

  if (next !== prev) {
    activeIndex.value = next
    emit('change', next, prev)
  }
}

function prev() {
  setActiveItem(activeIndex.value - 1)
}

function next() {
  setActiveItem(activeIndex.value + 1)
}

// Autoplay
function startAutoplay() {
  if (!props.autoplay || itemCount.value <= 1) return
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    next()
  }, props.interval)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function handleMouseEnter() {
  hovering.value = true
  if (props.pauseOnHover) {
    stopAutoplay()
  }
}

function handleMouseLeave() {
  hovering.value = false
  startAutoplay()
}

// Container style for slide animation
const containerStyle = computed(() => {
  if (props.type === 'card') return {}

  const offset = -activeIndex.value * 100
  if (props.direction === 'vertical') {
    return {
      transform: `translateY(${offset}%)`,
      transition: 'transform 0.3s ease-in-out',
    }
  }
  return {
    transform: `translateX(${offset}%)`,
    transition: 'transform 0.3s ease-in-out',
  }
})

// Provide context
provide(carouselContextKey, {
  activeIndex,
  items,
  direction: toRef(props, 'direction'),
  type: toRef(props, 'type'),
  loop: toRef(props, 'loop'),
  addItem,
  removeItem,
} as CarouselContext)

// Lifecycle
onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})

watch(
  () => props.autoplay,
  (val) => {
    if (val) {
      startAutoplay()
    } else {
      stopAutoplay()
    }
  },
)

watch(
  () => props.interval,
  () => {
    if (props.autoplay) {
      stopAutoplay()
      startAutoplay()
    }
  },
)

defineExpose({
  setActiveItem,
  prev,
  next,
  activeIndex,
})
</script>

<template>
  <div
    :class="[ns.b(), ns.m(direction), type && ns.m(type)]"
    :style="{ height }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      :class="ns.e('container')"
      :style="type !== 'card' ? containerStyle : undefined"
    >
      <slot />
    </div>

    <!-- Left arrow -->
    <button
      v-if="arrow !== 'never'"
      v-show="arrow === 'always' || hovering"
      :class="[ns.e('arrow'), ns.e('arrow--left')]"
      type="button"
      @click.stop="prev"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <!-- Right arrow -->
    <button
      v-if="arrow !== 'never'"
      v-show="arrow === 'always' || hovering"
      :class="[ns.e('arrow'), ns.e('arrow--right')]"
      type="button"
      @click.stop="next"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>

    <!-- Indicators -->
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="[
        ns.e('indicators'),
        ns.is('outside', indicatorPosition === 'outside'),
        ns.m(direction),
      ]"
    >
      <li
        v-for="(_, index) in itemCount"
        :key="index"
        :class="[ns.e('indicator'), ns.is('active', index === activeIndex)]"
        @click.stop="trigger === 'click' && setActiveItem(index)"
        @mouseenter="trigger === 'hover' && setActiveItem(index)"
      />
    </ul>
  </div>
</template>
