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
  useFormSize,
  usePopper,
  useClickOutside,
  useZIndex,
} from '@stellux/hooks'
import { autocompleteProps, autocompleteEmits } from './autocomplete'
import StxInput from '../input/input.vue'
import StxScrollbar from '../scrollbar/scrollbar.vue'

defineOptions({ name: 'StxAutocomplete' })

const props = defineProps(autocompleteProps)
const emit = defineEmits(autocompleteEmits)

const ns = useNamespace('autocomplete')
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)
const { nextZIndex } = useZIndex()

// Refs
const wrapperRef = shallowRef<HTMLElement>()
const dropdownRef = shallowRef<HTMLElement>()
const inputRef = shallowRef<InstanceType<typeof StxInput>>()

// State
const visible = ref(false)
const suggestions = ref<any[]>([])
const loading = ref(false)
const highlightedIndex = ref(-1)
const currentZIndex = ref(2000)

// Popper
const { x, y, placement } = usePopper(wrapperRef, dropdownRef, {
  placement: toRef(props, 'placement') as any,
  offset: ref(4),
})

// Click outside to close
useClickOutside([wrapperRef, dropdownRef], () => {
  visible.value = false
})

// Floating styles
const floatingStyles = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: `${x.value}px`,
  top: `${y.value}px`,
  zIndex: currentZIndex.value,
  width: props.fitInputWidth && wrapperRef.value
    ? `${wrapperRef.value.offsetWidth}px`
    : undefined,
}))

// Debounce timer
let debounceTimer: ReturnType<typeof setTimeout> | undefined

function clearDebounce() {
  if (debounceTimer !== undefined) {
    clearTimeout(debounceTimer)
    debounceTimer = undefined
  }
}

function fetchSuggestions(query: string) {
  if (!props.fetchSuggestions) {
    suggestions.value = []
    return
  }

  loading.value = true

  const cb = (results: any[]) => {
    loading.value = false
    suggestions.value = results || []
    if (suggestions.value.length > 0) {
      open()
      if (props.highlightFirstItem) {
        highlightedIndex.value = 0
      }
    } else {
      visible.value = false
    }
  }

  const result = props.fetchSuggestions(query, cb)

  // Support promise-based return
  if (result && typeof (result as Promise<any[]>).then === 'function') {
    ;(result as Promise<any[]>).then((data) => {
      cb(data)
    }).catch(() => {
      loading.value = false
      suggestions.value = []
    })
  }
}

function debouncedFetch(query: string) {
  clearDebounce()
  debounceTimer = setTimeout(() => {
    fetchSuggestions(query)
  }, props.debounce)
}

function open() {
  currentZIndex.value = nextZIndex()
  visible.value = true
}

function close() {
  visible.value = false
}

// Input handlers
function handleInput(val: string | number) {
  const strVal = String(val)
  emit('update:modelValue', strVal)
  emit('input', strVal)
  highlightedIndex.value = -1
  debouncedFetch(strVal)
}

function handleChange(val: string | number) {
  emit('change', String(val))
}

function handleFocus(evt: FocusEvent) {
  emit('focus', evt)
  if (props.triggerOnFocus) {
    debouncedFetch(props.modelValue)
  }
}

function handleBlur(evt: FocusEvent) {
  emit('blur', evt)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  suggestions.value = []
  visible.value = false
}

// Selection
function getLabel(item: any): string {
  if (typeof item === 'string') return item
  return item[props.valueKey] ?? ''
}

function handleSelect(item: any) {
  const val = getLabel(item)
  emit('update:modelValue', val)
  emit('select', item)
  nextTick(() => {
    visible.value = false
  })
}

// Keyboard navigation
function handleKeydown(evt: KeyboardEvent | Event) {
  const e = evt as KeyboardEvent
  if (!visible.value) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        suggestions.value.length - 1,
      )
      break
    case 'ArrowUp':
      e.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      break
    case 'Enter':
      e.preventDefault()
      if (
        highlightedIndex.value >= 0 &&
        highlightedIndex.value < suggestions.value.length
      ) {
        handleSelect(suggestions.value[highlightedIndex.value])
      } else if (props.selectWhenUnmatched) {
        emit('select', { [props.valueKey]: props.modelValue })
        close()
      }
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
  }
}

// Cleanup
onBeforeUnmount(() => {
  clearDebounce()
})

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

<template>
  <div ref="wrapperRef" :class="[ns.b(), ns.m(actualSize)]">
    <stx-input
      ref="inputRef"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="actualDisabled"
      :clearable="clearable"
      :size="actualSize"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @keydown="handleKeydown"
    />

    <Teleport to="body">
      <Transition name="stx-fade-in">
        <div
          v-if="visible && (suggestions.length > 0 || loading)"
          ref="dropdownRef"
          :class="ns.e('dropdown')"
          :style="floatingStyles"
        >
          <stx-scrollbar max-height="280px">
            <div v-if="loading && !hideLoading" :class="ns.e('loading')">
              Loading...
            </div>
            <template v-else>
              <div
                v-for="(item, index) in suggestions"
                :key="index"
                :class="[
                  ns.e('item'),
                  ns.is('highlighted', highlightedIndex === index),
                ]"
                @mouseenter="highlightedIndex = index"
                @click="handleSelect(item)"
              >
                <slot name="default" :item="item">
                  {{ getLabel(item) }}
                </slot>
              </div>
            </template>
          </stx-scrollbar>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
