<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useNamespace, useFormDisabled, useFormSize } from '@stellux/hooks'
import { inputOtpProps, inputOtpEmits } from './input-otp'

defineOptions({ name: 'StxInputOtp' })

const props = defineProps(inputOtpProps)
const emit = defineEmits(inputOtpEmits)

const ns = useNamespace('input-otp')
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

const inputRefs = ref<(HTMLInputElement | null)[]>([])
const focusedIndex = ref(-1)

function setInputRef(el: any, index: number) {
  inputRefs.value[index] = el as HTMLInputElement | null
}

function getCharAt(index: number): string {
  return props.modelValue[index] || ''
}

function updateValue(chars: string[]) {
  let value = chars.join('')
  emit('update:modelValue', value)
  emit('change', value)

  if (value.length === props.length) {
    emit('complete', value)
  }
}

function setCharAt(index: number, char: string) {
  const chars = props.modelValue.split('')
  // Pad if needed
  while (chars.length < props.length) chars.push('')
  chars[index] = char
  updateValue(chars)
}

function handleInput(evt: Event, index: number) {
  const input = evt.target as HTMLInputElement
  let value = input.value

  // Apply formatter if provided
  if (props.formatter) {
    value = props.formatter(value)
  }

  // For number type, only allow digits
  if (props.type === 'number') {
    value = value.replace(/\D/g, '')
  }

  if (!value) {
    setCharAt(index, '')
    return
  }

  // Take only the last character (handles overwrite)
  const char = value.slice(-1)
  setCharAt(index, char)

  // Auto-advance
  if (index < props.length - 1) {
    focusAt(index + 1)
  }
}

function handleKeydown(evt: KeyboardEvent, index: number) {
  if (evt.key === 'Backspace') {
    evt.preventDefault()
    const currentChar = getCharAt(index)
    if (currentChar) {
      setCharAt(index, '')
    } else if (index > 0) {
      setCharAt(index - 1, '')
      focusAt(index - 1)
    }
  } else if (evt.key === 'ArrowLeft') {
    evt.preventDefault()
    if (index > 0) focusAt(index - 1)
  } else if (evt.key === 'ArrowRight') {
    evt.preventDefault()
    if (index < props.length - 1) focusAt(index + 1)
  } else if (evt.key === 'Delete') {
    evt.preventDefault()
    setCharAt(index, '')
  }
}

function handleFocus(evt: FocusEvent, index: number) {
  focusedIndex.value = index
  // Select the input content
  const input = inputRefs.value[index]
  if (input) input.select()
  emit('focus', evt)
}

function handleBlur(evt: FocusEvent) {
  focusedIndex.value = -1
  emit('blur', evt)
}

function handlePaste(evt: ClipboardEvent, index: number) {
  evt.preventDefault()
  const pastedData = evt.clipboardData?.getData('text') || ''
  let chars = pastedData.split('')

  // Filter for number type
  if (props.type === 'number') {
    chars = chars.filter((c) => /\d/.test(c))
  }

  // Apply formatter if provided
  if (props.formatter) {
    chars = chars.map((c) => props.formatter!(c))
  }

  const currentChars = props.modelValue.split('')
  while (currentChars.length < props.length) currentChars.push('')

  // Spread pasted text starting from current index
  for (let i = 0; i < chars.length && index + i < props.length; i++) {
    currentChars[index + i] = chars[i]
  }

  updateValue(currentChars)

  // Focus the input after the last pasted char
  const nextIndex = Math.min(index + chars.length, props.length - 1)
  focusAt(nextIndex)
}

function focusAt(index: number) {
  const input = inputRefs.value[index]
  if (input) {
    input.focus()
    input.select()
  }
}

// Compute separator interval (show separator at every position by default)
const separatorInterval = computed(() => {
  // Show separator between every cell
  return 1
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(actualSize),
      ns.is('disabled', actualDisabled),
    ]"
  >
    <template v-for="(_, index) in length" :key="index">
      <span
        v-if="separator && index > 0"
        :class="ns.e('separator')"
      >
        {{ separator }}
      </span>
      <input
        :ref="(el) => setInputRef(el, index)"
        :class="[ns.e('input'), ns.is('active', focusedIndex === index)]"
        :type="mask ? 'password' : type === 'number' ? 'tel' : 'text'"
        :inputmode="type === 'number' ? 'numeric' : 'text'"
        :value="getCharAt(index)"
        :disabled="actualDisabled"
        maxlength="1"
        autocomplete="one-time-code"
        @input="handleInput($event, index)"
        @keydown="handleKeydown($event, index)"
        @focus="handleFocus($event, index)"
        @blur="handleBlur"
        @paste="handlePaste($event, index)"
      />
    </template>
  </div>
</template>
