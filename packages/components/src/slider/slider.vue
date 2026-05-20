<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { useNamespace, useFormDisabled, useFormSize, useFormItem } from '@stellux/hooks'
import { sliderProps, sliderEmits } from './slider'
import StxTooltip from '../tooltip/tooltip.vue'
import StxInputNumber from '../input-number/input-number.vue'

defineOptions({ name: 'StxSlider' })

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const ns = useNamespace('slider')
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)
const { formItem } = useFormItem()

const runwayRef = shallowRef<HTMLElement>()

// Internal decomposition of modelValue
const firstValue = computed(() => {
  if (props.range && Array.isArray(props.modelValue)) {
    return props.modelValue[0]
  }
  return typeof props.modelValue === 'number' ? props.modelValue : 0
})

const secondValue = computed(() => {
  if (props.range && Array.isArray(props.modelValue)) {
    return props.modelValue[1]
  }
  return props.max
})

// Snap value to step and clamp
function snapToStep(val: number): number {
  const { min, max, step } = props
  const steps = Math.round((val - min) / step)
  let result = steps * step + min
  result = Math.max(min, Math.min(max, result))
  // Fix floating point
  const precision = String(step).split('.')[1]?.length || 0
  return parseFloat(result.toFixed(precision))
}

// Convert a position (0..1 fraction) to a value
function positionToValue(fraction: number): number {
  const { min, max } = props
  return snapToStep(min + fraction * (max - min))
}

// Convert a value to a fraction (0..1)
function valueToFraction(val: number): number {
  const { min, max } = props
  if (max === min) return 0
  return (val - min) / (max - min)
}

// Bar style: the filled portion
const barStyle = computed(() => {
  const start = valueToFraction(props.range ? Math.min(firstValue.value, secondValue.value) : props.min)
  const end = valueToFraction(props.range ? Math.max(firstValue.value, secondValue.value) : firstValue.value)

  if (props.vertical) {
    return {
      bottom: `${start * 100}%`,
      height: `${(end - start) * 100}%`,
    }
  }
  return {
    left: `${start * 100}%`,
    width: `${(end - start) * 100}%`,
  }
})

// Thumb positions
const thumb1Style = computed(() => {
  const frac = valueToFraction(firstValue.value)
  if (props.vertical) {
    return { bottom: `${frac * 100}%` }
  }
  return { left: `${frac * 100}%` }
})

const thumb2Style = computed(() => {
  const frac = valueToFraction(secondValue.value)
  if (props.vertical) {
    return { bottom: `${frac * 100}%` }
  }
  return { left: `${frac * 100}%` }
})

// Stops
const stops = computed(() => {
  if (!props.showStops) return []
  const { min, max, step } = props
  const result: number[] = []
  for (let val = min + step; val < max; val += step) {
    result.push(valueToFraction(val))
  }
  return result
})

function stopStyle(frac: number) {
  if (props.vertical) {
    return { bottom: `${frac * 100}%` }
  }
  return { left: `${frac * 100}%` }
}

// Marks
function markStopStyle(key: string | number) {
  const frac = valueToFraction(Number(key))
  if (props.vertical) {
    return { bottom: `${frac * 100}%` }
  }
  return { left: `${frac * 100}%` }
}

function markTextStyle(key: string | number) {
  const frac = valueToFraction(Number(key))
  const mark = props.marks?.[Number(key)]
  const customStyle = typeof mark === 'object' ? mark.style ?? {} : {}
  if (props.vertical) {
    return { bottom: `${frac * 100}%`, ...customStyle }
  }
  return { left: `${frac * 100}%`, ...customStyle }
}

function getMarkLabel(mark: string | { style?: object; label: string }): string {
  return typeof mark === 'string' ? mark : mark.label
}

// Drag state
let dragging = false
let dragThumb: 0 | 1 = 0
let startX = 0
let startY = 0
let startFraction = 0

function getFractionFromEvent(event: MouseEvent): number {
  const runway = runwayRef.value
  if (!runway) return 0
  const rect = runway.getBoundingClientRect()

  if (props.vertical) {
    return 1 - (event.clientY - rect.top) / rect.height
  }
  return (event.clientX - rect.left) / rect.width
}

function emitValue(val: number | [number, number]) {
  emit('update:modelValue', val)
  emit('input', val)
}

function setValueForThumb(thumb: 0 | 1, val: number) {
  if (props.range) {
    const arr: [number, number] = [firstValue.value, secondValue.value]
    arr[thumb] = val
    // Keep sorted
    if (arr[0] > arr[1]) {
      arr.reverse()
    }
    emitValue(arr)
  } else {
    emitValue(val)
  }
}

function startDrag(event: MouseEvent, thumb: 0 | 1) {
  if (actualDisabled.value) return
  event.preventDefault()
  dragging = true
  dragThumb = thumb
  startX = event.clientX
  startY = event.clientY
  startFraction = thumb === 0 ? valueToFraction(firstValue.value) : valueToFraction(secondValue.value)

  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}

function onDragMove(event: MouseEvent) {
  if (!dragging) return
  const frac = Math.max(0, Math.min(1, getFractionFromEvent(event)))
  const val = positionToValue(frac)
  setValueForThumb(dragThumb, val)
}

function onDragEnd() {
  if (!dragging) return
  dragging = false
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)

  if (props.range) {
    emit('change', [firstValue.value, secondValue.value])
  } else {
    emit('change', firstValue.value)
  }
  formItem?.validate('change')
}

function onRunwayClick(event: MouseEvent) {
  if (actualDisabled.value) return
  // Don't respond if we clicked a thumb
  const target = event.target as HTMLElement
  if (target.closest(`.${ns.e('button-wrapper')}`)) return

  const frac = Math.max(0, Math.min(1, getFractionFromEvent(event)))
  const val = positionToValue(frac)

  if (props.range) {
    // Move the closer thumb
    const dist0 = Math.abs(firstValue.value - val)
    const dist1 = Math.abs(secondValue.value - val)
    const thumb: 0 | 1 = dist0 <= dist1 ? 0 : 1
    setValueForThumb(thumb, val)
    if (props.range) {
      emit('change', [firstValue.value, secondValue.value])
    }
  } else {
    emitValue(val)
    emit('change', val)
  }
  formItem?.validate('change')
}

function handleInputChange(val: number | undefined) {
  if (val === undefined) return
  const clamped = snapToStep(val)
  emitValue(clamped)
  emit('change', clamped)
  formItem?.validate('change')
}

// Cleanup on unmount
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
})

// Tooltip text
function tooltipText(val: number): string {
  return props.formatTooltip ? props.formatTooltip(val) : String(val)
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('vertical', vertical), ns.m(actualSize), ns.is('disabled', actualDisabled)]"
    :style="vertical ? { height } : undefined"
  >
    <!-- Runway (track) -->
    <div ref="runwayRef" :class="ns.e('runway')" @mousedown="onRunwayClick">
      <!-- Bar (filled portion) -->
      <div :class="ns.e('bar')" :style="barStyle" />

      <!-- Stops -->
      <div
        v-if="showStops"
        v-for="(stop, idx) in stops"
        :key="idx"
        :class="ns.e('stop')"
        :style="stopStyle(stop)"
      />

      <!-- Marks -->
      <template v-if="marks">
        <div
          v-for="(mark, key) in marks"
          :key="'s' + key"
          :class="ns.e('marks-stop')"
          :style="markStopStyle(key)"
        />
        <div
          v-for="(mark, key) in marks"
          :key="'t' + key"
          :class="ns.e('marks-text')"
          :style="markTextStyle(key)"
        >
          {{ getMarkLabel(mark) }}
        </div>
      </template>

      <!-- Thumb 1 -->
      <div
        :class="ns.e('button-wrapper')"
        :style="thumb1Style"
        @mousedown="startDrag($event, 0)"
      >
        <stx-tooltip
          v-if="showTooltip"
          :content="tooltipText(firstValue)"
          :placement="placement"
          trigger="hover"
        >
          <div :class="ns.e('button')" />
        </stx-tooltip>
        <div v-else :class="ns.e('button')" />
      </div>

      <!-- Thumb 2 (range mode) -->
      <div
        v-if="range"
        :class="ns.e('button-wrapper')"
        :style="thumb2Style"
        @mousedown="startDrag($event, 1)"
      >
        <stx-tooltip
          v-if="showTooltip"
          :content="tooltipText(secondValue)"
          :placement="placement"
          trigger="hover"
        >
          <div :class="ns.e('button')" />
        </stx-tooltip>
        <div v-else :class="ns.e('button')" />
      </div>
    </div>

    <!-- Input (optional, single mode only) -->
    <stx-input-number
      v-if="showInput && !range"
      :model-value="firstValue"
      :min="min"
      :max="max"
      :step="step"
      :size="inputSize"
      :controls="showInputControls"
      :disabled="actualDisabled"
      @change="handleInputChange"
      style="width: 130px; margin-left: 16px; flex-shrink: 0;"
    />
  </div>
</template>
