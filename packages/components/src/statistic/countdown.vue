<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { countdownProps, countdownEmits } from './countdown'

defineOptions({ name: 'StxCountdown' })

const props = defineProps(countdownProps)
const emit = defineEmits(countdownEmits)

const ns = useNamespace('statistic')

const remaining = ref(0)
let rafId: number | null = null

function getRemaining(): number {
  return Math.max(props.value - Date.now(), 0)
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const milliseconds = Math.floor(ms % 1000)

  return props.format
    .replace(/DD/g, String(days).padStart(2, '0'))
    .replace(/D/g, String(days))
    .replace(/HH/g, String(hours).padStart(2, '0'))
    .replace(/H/g, String(hours))
    .replace(/mm/g, String(minutes).padStart(2, '0'))
    .replace(/m/g, String(minutes))
    .replace(/ss/g, String(seconds).padStart(2, '0'))
    .replace(/s/g, String(seconds))
    .replace(/SSS/g, String(milliseconds).padStart(3, '0'))
}

const displayValue = computed(() => formatTime(remaining.value))

function tick() {
  remaining.value = getRemaining()
  emit('change', remaining.value)

  if (remaining.value <= 0) {
    emit('finish')
    stopTimer()
    return
  }

  rafId = requestAnimationFrame(tick)
}

function startTimer() {
  stopTimer()
  remaining.value = getRemaining()
  if (remaining.value > 0) {
    rafId = requestAnimationFrame(tick)
  }
}

function stopTimer() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

watch(() => props.value, () => {
  startTimer()
})

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <div :class="ns.b()">
    <div v-if="title || $slots.title" :class="ns.e('head')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="ns.e('content')" :style="valueStyle">
      <span v-if="prefix || $slots.prefix" :class="ns.e('prefix')">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span :class="ns.e('value')">{{ displayValue }}</span>
      <span v-if="suffix || $slots.suffix" :class="ns.e('suffix')">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
