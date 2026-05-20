<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace, useFormDisabled, useFormItem } from '@stellux/hooks'
import { rateProps, rateEmits } from './rate'

defineOptions({ name: 'StxRate' })

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const ns = useNamespace('rate')
const actualDisabled = useFormDisabled(props)
const { formItem } = useFormItem()

const hoverIndex = ref(-1)
const hoverHalf = ref(false)

const currentValue = computed(() => props.modelValue)

// Determine which color to use for a given star index (1-based)
function getColor(index: number): string {
  const val = hoverIndex.value >= 0
    ? (hoverHalf.value ? hoverIndex.value + 0.5 : hoverIndex.value + 1)
    : currentValue.value

  if (val <= 0) return getVoidColor()

  const threshold = val
  if (index > threshold) return getVoidColor()

  if (Array.isArray(props.colors)) {
    if (threshold <= props.lowThreshold) return props.colors[0]
    if (threshold <= props.highThreshold) return props.colors[1]
    return props.colors[2]
  }

  // Object form: { 2: '#99A9BF', 4: '#F7BA2A', 5: '#FF9900' }
  const keys = Object.keys(props.colors)
    .map(Number)
    .sort((a, b) => a - b)
  for (const key of keys) {
    if (threshold <= key) return (props.colors as Record<number, string>)[key]
  }
  return (props.colors as Record<number, string>)[keys[keys.length - 1]]
}

function getVoidColor(): string {
  return actualDisabled.value ? props.disabledVoidColor : props.voidColor
}

// Active color used across all filled stars
function getActiveColor(): string {
  const val = hoverIndex.value >= 0
    ? (hoverHalf.value ? hoverIndex.value + 0.5 : hoverIndex.value + 1)
    : currentValue.value

  if (val <= 0) return getVoidColor()

  if (Array.isArray(props.colors)) {
    if (val <= props.lowThreshold) return props.colors[0]
    if (val <= props.highThreshold) return props.colors[1]
    return props.colors[2]
  }

  const keys = Object.keys(props.colors)
    .map(Number)
    .sort((a, b) => a - b)
  for (const key of keys) {
    if (val <= key) return (props.colors as Record<number, string>)[key]
  }
  return (props.colors as Record<number, string>)[keys[keys.length - 1]]
}

// Value to display (hover preview or actual)
const displayValue = computed(() => {
  if (hoverIndex.value >= 0) {
    return hoverHalf.value ? hoverIndex.value + 0.5 : hoverIndex.value + 1
  }
  return currentValue.value
})

// Whether a star at `index` (0-based) is fully active
function isStarFull(index: number): boolean {
  return displayValue.value >= index + 1
}

// Whether a star at `index` (0-based) is half active
function isStarHalf(index: number): boolean {
  if (!props.allowHalf) return false
  return !isStarFull(index) && displayValue.value >= index + 0.5
}

function handleMouseMove(event: MouseEvent, index: number) {
  if (actualDisabled.value) return
  hoverIndex.value = index
  if (props.allowHalf) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    hoverHalf.value = (event.clientX - rect.left) < rect.width / 2
  } else {
    hoverHalf.value = false
  }
}

function handleMouseLeave() {
  if (actualDisabled.value) return
  hoverIndex.value = -1
  hoverHalf.value = false
}

function handleClick(event: MouseEvent, index: number) {
  if (actualDisabled.value) return

  let newVal: number
  if (props.allowHalf) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const isHalf = (event.clientX - rect.left) < rect.width / 2
    newVal = isHalf ? index + 0.5 : index + 1
  } else {
    newVal = index + 1
  }

  if (props.clearable && newVal === currentValue.value) {
    newVal = 0
  }

  emit('update:modelValue', newVal)
  emit('change', newVal)
  formItem?.validate('change')
}

const rateText = computed(() => {
  if (props.showText) {
    const idx = Math.ceil(displayValue.value) - 1
    return props.texts[idx] ?? ''
  }
  return ''
})

const scoreText = computed(() => {
  if (props.showScore) {
    return props.scoreTemplate.replace('{value}', String(displayValue.value))
  }
  return ''
})

const sizeClass = computed(() => {
  if (props.size !== 'default') return ns.m(props.size)
  return ''
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      sizeClass,
      ns.is('disabled', actualDisabled),
    ]"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="'Rating'"
    @mouseleave="handleMouseLeave"
  >
    <span
      v-for="(item, index) in max"
      :key="index"
      :class="[
        ns.e('item'),
        ns.is('active', isStarFull(index)),
        ns.is('half', isStarHalf(index)),
        ns.is('hover', hoverIndex === index),
      ]"
      @mousemove="handleMouseMove($event, index)"
      @click="handleClick($event, index)"
    >
      <!-- Void star (background) -->
      <svg
        :class="ns.e('icon')"
        viewBox="0 0 24 24"
        :style="{ color: getVoidColor() }"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill="currentColor"
        />
      </svg>
      <!-- Full star (foreground) -->
      <svg
        :class="[ns.e('icon'), ns.e('icon--full')]"
        viewBox="0 0 24 24"
        :style="{
          color: getActiveColor(),
          width: isStarHalf(index) ? '50%' : (isStarFull(index) ? '100%' : '0%'),
        }"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill="currentColor"
        />
      </svg>
    </span>

    <span
      v-if="showText && rateText"
      :class="ns.e('text')"
      :style="textColor ? { color: textColor } : undefined"
    >
      {{ rateText }}
    </span>
    <span
      v-if="showScore && scoreText"
      :class="ns.e('score')"
      :style="textColor ? { color: textColor } : undefined"
    >
      {{ scoreText }}
    </span>
  </div>
</template>
