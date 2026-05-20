<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  shallowRef,
  toRef,
  watch,
  type CSSProperties,
} from 'vue'
import {
  useNamespace,
  useFormDisabled,
  usePopper,
  useClickOutside,
  useZIndex,
} from '@stellux/hooks'
import { mentionProps, mentionEmits, type MentionOption } from './mention'
import StxScrollbar from '../scrollbar/scrollbar.vue'

defineOptions({ name: 'StxMention' })

const props = defineProps(mentionProps)
const emit = defineEmits(mentionEmits)

const ns = useNamespace('mention')
const actualDisabled = useFormDisabled(props)
const { nextZIndex } = useZIndex()

// Refs
const wrapperRef = shallowRef<HTMLElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const dropdownRef = shallowRef<HTMLElement>()
const measureRef = shallowRef<HTMLElement>()

// State
const visible = ref(false)
const highlightedIndex = ref(0)
const currentZIndex = ref(2000)

// Tracking the active mention query
const mentionState = ref<{
  prefix: string
  startPos: number
  pattern: string
} | null>(null)

// Popper positioning
const { x, y } = usePopper(wrapperRef, dropdownRef, {
  placement: toRef(props, 'placement') as any,
  offset: ref(props.offset),
})

// Click outside to close
useClickOutside([wrapperRef, dropdownRef], () => {
  closeMention()
})

// Normalize prefix to array
const prefixes = computed(() => {
  if (Array.isArray(props.prefix)) return props.prefix
  return [props.prefix]
})

// Filtered options
const filteredOptions = computed<MentionOption[]>(() => {
  if (!mentionState.value) return []
  const { pattern } = mentionState.value

  if (props.filterOption === false) {
    return props.options
  }

  if (typeof props.filterOption === 'function') {
    return props.options.filter((opt) =>
      (props.filterOption as Function)(pattern, opt),
    )
  }

  // Default filter: case-insensitive match on value or label
  const lowerPattern = pattern.toLowerCase()
  return props.options.filter((opt) => {
    const label = (opt.label || opt.value).toLowerCase()
    return label.includes(lowerPattern)
  })
})

const floatingStyles = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: `${x.value}px`,
  top: `${y.value}px`,
  zIndex: currentZIndex.value,
}))

// Detect prefix in text before cursor
function detectMention(text: string, cursorPos: number): { prefix: string; startPos: number; pattern: string } | null {
  // Look backward from cursor to find a prefix char
  const textBeforeCursor = text.substring(0, cursorPos)

  for (const prefix of prefixes.value) {
    // Find the last occurrence of the prefix that could start a mention
    const lastPrefixIndex = textBeforeCursor.lastIndexOf(prefix)
    if (lastPrefixIndex < 0) continue

    // The prefix must be at the start or preceded by a split char (or whitespace)
    if (lastPrefixIndex > 0) {
      const charBefore = textBeforeCursor[lastPrefixIndex - 1]
      if (charBefore !== props.split && charBefore !== '\n' && charBefore !== ' ') {
        continue
      }
    }

    const pattern = textBeforeCursor.substring(lastPrefixIndex + prefix.length)

    // Pattern should not contain the split character (except if whole mode)
    if (!props.whole && pattern.includes(props.split)) {
      continue
    }

    // If whole mode and checkIsWhole, verify
    if (props.whole && props.checkIsWhole && pattern.length > 0) {
      if (props.checkIsWhole(pattern, prefix)) {
        // It's already a whole mention, don't show dropdown
        continue
      }
    }

    return {
      prefix,
      startPos: lastPrefixIndex,
      pattern,
    }
  }

  return null
}

function handleInput(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  const value = textarea.value
  const cursorPos = textarea.selectionStart ?? value.length

  emit('update:modelValue', value)

  const detected = detectMention(value, cursorPos)
  if (detected) {
    mentionState.value = detected
    highlightedIndex.value = 0
    emit('search', detected.pattern, detected.prefix)

    nextTick(() => {
      if (filteredOptions.value.length > 0) {
        openMention()
      } else {
        closeMention()
      }
    })
  } else {
    closeMention()
  }
}

function openMention() {
  currentZIndex.value = nextZIndex()
  visible.value = true
}

function closeMention() {
  visible.value = false
  mentionState.value = null
}

function handleSelect(option: MentionOption) {
  if (option.disabled) return
  if (!mentionState.value || !textareaRef.value) return

  const { prefix, startPos, pattern } = mentionState.value
  const textarea = textareaRef.value
  const value = props.modelValue
  const insertValue = option.value

  // Replace prefix + pattern with prefix + selected value + split
  const before = value.substring(0, startPos)
  const after = value.substring(startPos + prefix.length + pattern.length)
  const newValue = before + prefix + insertValue + props.split + after

  emit('update:modelValue', newValue)
  emit('select', option, prefix)

  closeMention()

  // Set cursor position after inserted text
  nextTick(() => {
    if (textarea) {
      const newCursorPos = startPos + prefix.length + insertValue.length + props.split.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
      textarea.focus()
    }
  })
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleKeydown(event: KeyboardEvent) {
  if (!visible.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        filteredOptions.value.length - 1,
      )
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (
        highlightedIndex.value >= 0 &&
        highlightedIndex.value < filteredOptions.value.length
      ) {
        handleSelect(filteredOptions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      closeMention()
      break
  }
}

function getOptionLabel(option: MentionOption): string {
  return option.label || option.value
}

// Watch filtered options to close when empty
watch(filteredOptions, (opts) => {
  if (mentionState.value && opts.length === 0) {
    visible.value = false
  } else if (mentionState.value && opts.length > 0 && !visible.value) {
    openMention()
  }
})

function focus() {
  textareaRef.value?.focus()
}

function blur() {
  textareaRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

<template>
  <div ref="wrapperRef" :class="[ns.b(), ns.is('disabled', actualDisabled)]">
    <textarea
      ref="textareaRef"
      :class="ns.e('input')"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="actualDisabled"
      :rows="rows"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />

    <!-- Hidden measure element for cursor position estimation -->
    <span ref="measureRef" :class="ns.e('measure')" aria-hidden="true" />

    <Teleport to="body">
      <Transition name="stx-fade-in">
        <div
          v-if="visible && filteredOptions.length > 0"
          ref="dropdownRef"
          :class="ns.e('dropdown')"
          :style="floatingStyles"
        >
          <stx-scrollbar max-height="200px">
            <div v-if="loading" :class="ns.e('loading')">
              Loading...
            </div>
            <template v-else>
              <div
                v-for="(option, index) in filteredOptions"
                :key="option.value"
                :class="[
                  ns.e('option'),
                  ns.is('highlighted', highlightedIndex === index),
                  ns.is('disabled', !!option.disabled),
                ]"
                @mouseenter="highlightedIndex = index"
                @mousedown.prevent="handleSelect(option)"
              >
                <slot name="option" :option="option">
                  {{ getOptionLabel(option) }}
                </slot>
              </div>
            </template>
          </stx-scrollbar>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
