<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { useFormDisabled, useFormSize, useFormItem } from '@stellux/hooks'
import { inputNumberProps, inputNumberEmits } from './input-number'

defineOptions({ name: 'StxInputNumber' })

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const ns = useNamespace('input-number')
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)
const { formItem } = useFormItem()

const inputRef = shallowRef<HTMLInputElement>()
const userInput = ref<string | null>(null)

const minDisabled = computed(
  () => props.modelValue !== undefined && props.modelValue <= props.min,
)

const maxDisabled = computed(
  () => props.modelValue !== undefined && props.modelValue >= props.max,
)

function toPrecision(num: number): number {
  if (props.precision === undefined) return num
  return parseFloat(num.toFixed(props.precision))
}

function ensureInRange(val: number): number {
  let result = val
  if (result > props.max) result = props.max
  if (result < props.min) result = props.min
  if (props.stepStrictly) {
    const stepPrecision = String(props.step).split('.')[1]?.length || 0
    const precisionFactor = Math.pow(10, stepPrecision)
    result =
      Math.round((result - props.min) / props.step) * props.step + props.min
    // Handle floating point
    result = parseFloat(result.toFixed(stepPrecision))
  }
  return toPrecision(result)
}

const displayValue = computed(() => {
  if (userInput.value !== null) return userInput.value
  if (props.modelValue === undefined || props.modelValue === null) return ''
  if (props.precision !== undefined) {
    return props.modelValue.toFixed(props.precision)
  }
  return String(props.modelValue)
})

function setCurrentValue(val: number | undefined) {
  const oldVal = props.modelValue
  emit('update:modelValue', val)
  emit('change', val, oldVal)
  formItem?.validate('change')
}

function increase() {
  if (actualDisabled.value || props.readonly || maxDisabled.value) return
  const val = props.modelValue ?? 0
  const newVal = ensureInRange(val + props.step)
  setCurrentValue(newVal)
}

function decrease() {
  if (actualDisabled.value || props.readonly || minDisabled.value) return
  const val = props.modelValue ?? 0
  const newVal = ensureInRange(val - props.step)
  setCurrentValue(newVal)
}

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  userInput.value = value
}

function handleChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  userInput.value = null

  if (value === '') {
    setCurrentValue(props.valueOnClear ?? undefined)
    return
  }

  const parsed = Number(value)
  if (Number.isNaN(parsed)) {
    // Reset to previous value
    if (inputRef.value) {
      inputRef.value.value = displayValue.value
    }
    return
  }

  const clamped = ensureInRange(parsed)
  setCurrentValue(clamped)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  userInput.value = null
  emit('blur', event)
  formItem?.validate('blur')
}

// Sync input element when modelValue changes externally
watch(
  () => props.modelValue,
  () => {
    userInput.value = null
  },
)

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(actualSize),
      ns.is('disabled', actualDisabled),
      ns.is('controls-right', controlsPosition === 'right'),
      ns.is('without-controls', !controls),
    ]"
  >
    <span
      v-if="controls"
      :class="[ns.e('decrease'), ns.is('disabled', minDisabled)]"
      role="button"
      @click="decrease"
    >
      <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        <path d="M5 12h14" />
      </svg>
    </span>
    <span
      v-if="controls"
      :class="[ns.e('increase'), ns.is('disabled', maxDisabled)]"
      role="button"
      @click="increase"
    >
      <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
    <div :class="ns.e('wrapper')">
      <input
        ref="inputRef"
        type="text"
        :class="ns.e('inner')"
        :value="displayValue"
        :disabled="actualDisabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :name="name"
        :id="id"
        autocomplete="off"
        role="spinbutton"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.up.prevent="increase"
        @keydown.down.prevent="decrease"
      />
    </div>
  </div>
</template>
