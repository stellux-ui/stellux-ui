<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useNamespace, useFormDisabled, useFormSize, useFormItem } from '@stellux/hooks'
import { inputTagProps, inputTagEmits } from './input-tag'
import StxTag from '../tag/tag.vue'

defineOptions({ name: 'StxInputTag' })

const props = defineProps(inputTagProps)
const emit = defineEmits(inputTagEmits)

const ns = useNamespace('input-tag')
const { formItem } = useFormItem()
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

const inputRef = ref<HTMLInputElement>()
const inputValue = ref('')
const isFocused = ref(false)

// Drag state
const dragIndex = ref(-1)
const dragOverIndex = ref(-1)

const tagSize = computed(() => {
  const s = actualSize.value
  if (s === 'large') return 'default'
  if (s === 'default') return 'small'
  return 'small'
})

function focusInput() {
  if (actualDisabled.value) return
  inputRef.value?.focus()
}

function addTag(value: string) {
  const tag = value.trim()
  if (!tag) return
  // Check duplicate
  if (props.modelValue.includes(tag)) return
  // Check max
  if (props.max !== undefined && props.modelValue.length >= props.max) return
  // Custom validation
  if (props.validateTag && !props.validateTag(tag)) return

  const newTags = [...props.modelValue, tag]
  emit('update:modelValue', newTags)
  emit('change', newTags)
  emit('tag-add', tag)
  formItem?.validate?.('change')
  inputValue.value = ''
}

function removeTag(index: number) {
  if (actualDisabled.value) return
  const removed = props.modelValue[index]
  const newTags = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newTags)
  emit('change', newTags)
  emit('tag-remove', removed)
  formItem?.validate?.('change')
}

function handleKeydown(evt: KeyboardEvent) {
  if (actualDisabled.value) return

  const triggerKey = props.trigger === 'space' ? ' ' : 'Enter'

  if (evt.key === triggerKey) {
    evt.preventDefault()
    addTag(inputValue.value)
  } else if (evt.key === 'Backspace' && !inputValue.value && props.modelValue.length) {
    removeTag(props.modelValue.length - 1)
  }
}

function handleFocus(evt: FocusEvent) {
  isFocused.value = true
  emit('focus', evt)
}

function handleBlur(evt: FocusEvent) {
  isFocused.value = false
  // Auto-add tag on blur if there is input
  if (inputValue.value.trim()) {
    addTag(inputValue.value)
  }
  emit('blur', evt)
  formItem?.validate?.('blur')
}

function handleClear() {
  if (actualDisabled.value) return
  emit('update:modelValue', [])
  emit('change', [])
}

// ---- Drag handlers ----
function handleDragStart(index: number) {
  if (!props.draggable || actualDisabled.value) return
  dragIndex.value = index
}

function handleDragOver(evt: DragEvent, index: number) {
  if (!props.draggable || actualDisabled.value) return
  evt.preventDefault()
  dragOverIndex.value = index
}

function handleDrop(index: number) {
  if (!props.draggable || actualDisabled.value) return
  if (dragIndex.value === -1 || dragIndex.value === index) return
  const newTags = [...props.modelValue]
  const [removed] = newTags.splice(dragIndex.value, 1)
  newTags.splice(index, 0, removed)
  emit('update:modelValue', newTags)
  emit('change', newTags)
  dragIndex.value = -1
  dragOverIndex.value = -1
}

function handleDragEnd() {
  dragIndex.value = -1
  dragOverIndex.value = -1
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(actualSize),
      ns.is('focus', isFocused),
      ns.is('disabled', actualDisabled),
    ]"
    @click="focusInput"
  >
    <div :class="ns.e('inner')">
      <stx-tag
        v-for="(tag, index) in modelValue"
        :key="index"
        :type="tagType"
        :effect="tagEffect"
        :size="tagSize"
        closable
        :disable-transitions="false"
        :draggable="draggable"
        @close.stop="removeTag(index)"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver($event, index)"
        @drop="handleDrop(index)"
        @dragend="handleDragEnd"
      >
        {{ tag }}
      </stx-tag>
      <input
        ref="inputRef"
        :class="ns.e('input')"
        v-model="inputValue"
        :placeholder="!modelValue.length ? placeholder : ''"
        :disabled="actualDisabled"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <span
      v-if="clearable && modelValue.length"
      :class="ns.e('clear')"
      @click.stop="handleClear"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  </div>
</template>
