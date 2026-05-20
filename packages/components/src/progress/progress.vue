<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { progressProps } from './progress'

defineOptions({ name: 'StxProgress' })

const props = defineProps(progressProps)

const ns = useNamespace('progress')

const barPercentage = computed(() =>
  Math.max(0, Math.min(100, props.percentage))
)

const barColor = computed(() => {
  const { color, percentage } = props
  if (typeof color === 'function') {
    return color(percentage)
  }
  if (typeof color === 'string') {
    return color || ''
  }
  if (Array.isArray(color)) {
    const sorted = [...color].sort((a, b) => a.percentage - b.percentage)
    for (const item of sorted) {
      if (percentage <= item.percentage) {
        return item.color
      }
    }
    return sorted[sorted.length - 1]?.color || ''
  }
  return ''
})

const barStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${barPercentage.value}%`,
  }
  if (barColor.value) {
    style.backgroundColor = barColor.value
  }
  return style
})

const displayText = computed(() => {
  if (props.format) {
    return props.format(props.percentage)
  }
  return `${props.percentage}%`
})

// Circle / Dashboard SVG computations
const radius = computed(() => {
  if (props.type === 'circle' || props.type === 'dashboard') {
    return (props.width - props.strokeWidth) / 2
  }
  return 0
})

const perimeter = computed(() => 2 * Math.PI * radius.value)

const rate = computed(() => (props.type === 'dashboard' ? 0.75 : 1))

const strokeDasharray = computed(() => {
  return `${perimeter.value * rate.value}px, ${perimeter.value}px`
})

const strokeDashoffset = computed(() => {
  const offset =
    perimeter.value * rate.value * (1 - barPercentage.value / 100)
  return `${-offset}px`
})

const trailDasharray = computed(() => {
  return `${perimeter.value * rate.value}px, ${perimeter.value}px`
})

const trailDashoffset = computed(() => {
  if (props.type === 'dashboard') {
    return `${(-perimeter.value * (1 - rate.value)) / 2}px`
  }
  return '0px'
})

const arcDashoffset = computed(() => {
  if (props.type === 'dashboard') {
    const base = (-perimeter.value * (1 - rate.value)) / 2
    const progress =
      perimeter.value * rate.value * (1 - barPercentage.value / 100)
    return `${base - progress}px`
  }
  return strokeDashoffset.value
})

const circleViewBox = computed(() => `0 0 ${props.width} ${props.width}`)
const circleCenter = computed(() => props.width / 2)

const statusIcon = computed(() => {
  if (props.status === 'success') return 'check'
  if (props.status === 'exception') return 'close'
  if (props.status === 'warning') return 'warning'
  return ''
})

const progressClasses = computed(() => [
  ns.b(),
  ns.m(props.type),
  props.status && ns.m(props.status),
  ns.is('text-inside', props.textInside),
  ns.is('indeterminate', props.indeterminate),
  ns.is('striped', props.striped),
  ns.is('striped-flow', props.stripedFlow),
])

const indeterminateStyle = computed(() => ({
  animationDuration: `${props.duration}s`,
}))
</script>

<template>
  <div :class="progressClasses" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100">
    <!-- Line type -->
    <template v-if="type === 'line'">
      <div :class="ns.e('bar')">
        <div
          :class="ns.e('bar-outer')"
          :style="{ height: `${strokeWidth}px` }"
        >
          <div
            :class="[
              ns.e('bar-inner'),
              ns.is('indeterminate', indeterminate),
              ns.is('striped', striped),
              ns.is('striped-flow', stripedFlow),
            ]"
            :style="[
              barStyle,
              indeterminate ? indeterminateStyle : {},
            ]"
          >
            <div
              v-if="showText && textInside"
              :class="ns.e('inner-text')"
            >
              {{ displayText }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="showText && !textInside" :class="ns.e('text')">
        <template v-if="!statusIcon">{{ displayText }}</template>
        <svg
          v-else-if="statusIcon === 'check'"
          :class="ns.e('icon')"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <svg
          v-else-if="statusIcon === 'close'"
          :class="ns.e('icon')"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        <svg
          v-else-if="statusIcon === 'warning'"
          :class="ns.e('icon')"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        >
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
    </template>

    <!-- Circle / Dashboard type -->
    <template v-else>
      <div :class="ns.e('circle')" :style="{ width: `${width}px`, height: `${width}px` }">
        <svg :viewBox="circleViewBox">
          <!-- Track -->
          <circle
            :class="ns.e('circle-track')"
            :cx="circleCenter"
            :cy="circleCenter"
            :r="radius"
            fill="none"
            :stroke-width="strokeWidth"
            :style="{
              strokeDasharray: trailDasharray,
              strokeDashoffset: trailDashoffset,
            }"
          />
          <!-- Progress arc -->
          <circle
            :class="ns.e('circle-path')"
            :cx="circleCenter"
            :cy="circleCenter"
            :r="radius"
            fill="none"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            :style="{
              strokeDasharray: strokeDasharray,
              strokeDashoffset: arcDashoffset,
              stroke: barColor || undefined,
            }"
          />
        </svg>
        <div v-if="showText" :class="ns.e('text')">
          <template v-if="!statusIcon">{{ displayText }}</template>
          <svg
            v-else-if="statusIcon === 'check'"
            :class="ns.e('icon')"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <svg
            v-else-if="statusIcon === 'close'"
            :class="ns.e('icon')"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <svg
            v-else-if="statusIcon === 'warning'"
            :class="ns.e('icon')"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <path d="M12 9v4M12 17h.01" />
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
      </div>
    </template>
  </div>
</template>
