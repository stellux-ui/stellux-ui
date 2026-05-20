<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { carouselItemProps } from './carousel-item'
import { carouselContextKey } from './constants'

defineOptions({ name: 'StxCarouselItem' })

const props = defineProps(carouselItemProps)

const ns = useNamespace('carousel-item')
const instance = getCurrentInstance()!
const uid = instance.uid
const carousel = inject(carouselContextKey)!

onMounted(() => {
  carousel.addItem(uid)
})

onBeforeUnmount(() => {
  carousel.removeItem(uid)
})

const index = computed(() => carousel.items.value.indexOf(uid))
const active = computed(() => carousel.activeIndex.value === index.value)
const isCard = computed(() => carousel.type.value === 'card')

// For card type: calculate position and scale relative to active
const inStage = computed(() => {
  if (!isCard.value) return false
  const total = carousel.items.value.length
  const diff = index.value - carousel.activeIndex.value
  return (
    diff === 0 ||
    diff === 1 ||
    diff === -1 ||
    (carousel.loop.value && diff === total - 1) ||
    (carousel.loop.value && diff === -(total - 1))
  )
})

const itemStyle = computed(() => {
  if (isCard.value) {
    const total = carousel.items.value.length
    let diff = index.value - carousel.activeIndex.value

    // Normalize for loop
    if (carousel.loop.value) {
      if (diff > total / 2) diff -= total
      if (diff < -total / 2) diff += total
    }

    const isActive = diff === 0
    const scale = isActive ? 1 : 0.83
    const translateX = diff * 50

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex: isActive ? 2 : 1,
      opacity: inStage.value ? 1 : 0,
      transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    }
  }

  // Default slide mode: items are laid out side-by-side in the container
  if (carousel.direction.value === 'vertical') {
    return {
      height: '100%',
      width: '100%',
    }
  }

  return {
    width: '100%',
    flexShrink: 0,
  }
})

const ready = computed(() => {
  if (isCard.value) return inStage.value
  return true
})
</script>

<template>
  <div
    v-show="ready"
    :class="[
      ns.b(),
      ns.is('active', active),
      ns.is('in-stage', inStage),
      ns.is('animating', true),
    ]"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>
