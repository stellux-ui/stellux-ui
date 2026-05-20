<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick, type VNode } from 'vue'
import { useNamespace, useZIndex } from '@stellux/hooks'
import type { MessageBoxAction, MessageBoxType } from './message-box'

defineOptions({ name: 'StxMessageBox' })

const props = withDefaults(
  defineProps<{
    title?: string
    message: string | VNode
    type?: MessageBoxType
    showClose?: boolean
    showCancelButton?: boolean
    showConfirmButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    closeOnClickModal?: boolean
    closeOnPressEscape?: boolean
    distinguishCancelAndClose?: boolean
    lockScroll?: boolean
    showInput?: boolean
    inputPlaceholder?: string
    inputValue?: string
    inputType?: string
    inputPattern?: RegExp
    inputErrorMessage?: string
    beforeClose?: (action: MessageBoxAction, done: () => void) => void
    onAction?: (action: MessageBoxAction, inputValue?: string) => void
  }>(),
  {
    title: '',
    type: '',
    showClose: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    closeOnClickModal: true,
    closeOnPressEscape: true,
    distinguishCancelAndClose: false,
    lockScroll: true,
    showInput: false,
    inputPlaceholder: '',
    inputValue: '',
    inputType: 'text',
    inputErrorMessage: 'Invalid input',
  }
)

const ns = useNamespace('message-box')
const { nextZIndex } = useZIndex()

const visible = ref(false)
const zIndex = ref(nextZIndex())
const inputVal = ref(props.inputValue)
const inputError = ref(false)
const boxRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()

const isVNode = computed(() => {
  return typeof props.message === 'object' && props.message !== null
})

function validateInput(): boolean {
  if (!props.showInput) return true
  if (props.inputPattern) {
    if (!props.inputPattern.test(inputVal.value)) {
      inputError.value = true
      return false
    }
  }
  inputError.value = false
  return true
}

function handleAction(action: MessageBoxAction) {
  if (action === 'confirm' && props.showInput) {
    if (!validateInput()) return
  }

  if (action === 'close' && !props.distinguishCancelAndClose) {
    action = 'cancel'
  }

  if (props.beforeClose) {
    props.beforeClose(action, () => {
      doClose(action)
    })
  } else {
    doClose(action)
  }
}

function doClose(action: MessageBoxAction) {
  visible.value = false
  // Wait for transition to finish before calling onAction
  setTimeout(() => {
    props.onAction?.(action, inputVal.value)
  }, 200)
}

function handleWrapperClick() {
  if (props.closeOnClickModal) {
    handleAction('close')
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnPressEscape) {
    handleAction('close')
  }
}

function close() {
  handleAction('close')
}

onMounted(() => {
  // Lock scroll
  if (props.lockScroll) {
    document.body.style.overflow = 'hidden'
  }
  document.addEventListener('keydown', handleKeydown)
  // Show after mounting (allow transition to play)
  nextTick(() => {
    visible.value = true
    // Focus input if prompt mode
    if (props.showInput) {
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
  })
})

onBeforeUnmount(() => {
  if (props.lockScroll) {
    document.body.style.overflow = ''
  }
  document.removeEventListener('keydown', handleKeydown)
})

defineExpose({ close })
</script>

<template>
  <Transition name="stx-fade-in-linear">
    <div
      v-show="visible"
      :class="ns.e('wrapper')"
      :style="{ zIndex }"
      @click.self="handleWrapperClick"
    >
      <div
        ref="boxRef"
        :class="[ns.b(), type ? ns.m(type) : '']"
        role="dialog"
        aria-modal="true"
      >
        <!-- Header -->
        <div v-if="title || showClose" :class="ns.e('header')">
          <span v-if="title" :class="ns.e('title')">{{ title }}</span>
          <button
            v-if="showClose"
            :class="ns.e('close')"
            type="button"
            aria-label="Close"
            @click="handleAction('close')"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div :class="ns.e('body')">
          <!-- Type icon -->
          <span v-if="type" :class="ns.e('icon')">
            <!-- Success -->
            <svg
              v-if="type === 'success'"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <!-- Warning -->
            <svg
              v-else-if="type === 'warning'"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <!-- Info -->
            <svg
              v-else-if="type === 'info'"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <!-- Error -->
            <svg
              v-else-if="type === 'error'"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </span>
          <div :class="ns.e('message')">
            <component v-if="isVNode" :is="message as VNode" />
            <template v-else>{{ message }}</template>
          </div>
        </div>

        <!-- Input (for prompt mode) -->
        <div v-if="showInput" :class="ns.e('input')">
          <input
            ref="inputRef"
            v-model="inputVal"
            :type="inputType"
            :placeholder="inputPlaceholder"
            :class="[ns.e('input-inner'), { [ns.is('error', true)]: inputError }]"
            @keydown.enter="handleAction('confirm')"
          />
          <p v-if="inputError" :class="ns.e('input-error')">
            {{ inputErrorMessage }}
          </p>
        </div>

        <!-- Footer -->
        <div :class="ns.e('footer')">
          <button
            v-if="showCancelButton"
            :class="ns.e('cancel')"
            type="button"
            @click="handleAction('cancel')"
          >
            {{ cancelButtonText }}
          </button>
          <button
            v-if="showConfirmButton"
            :class="ns.e('confirm')"
            type="button"
            @click="handleAction('confirm')"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
