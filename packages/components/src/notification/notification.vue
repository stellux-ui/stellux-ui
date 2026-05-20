<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { notificationProps } from './notification'
import type { NotificationPosition } from './notification'

defineOptions({ name: 'StxNotification' })

const props = defineProps(notificationProps)
const emit = defineEmits<{
  destroy: []
}>()

const ns = useNamespace('notification')

const visible = ref(false)
const notificationRef = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

const isRight = computed(() => props.position.includes('right'))
const isTop = computed(() => props.position.includes('top'))

const verticalProperty = computed(() => (isTop.value ? 'top' : 'bottom'))
const horizontalClass = computed(() => (isRight.value ? 'right' : 'left'))

const positionStyle = computed(() => ({
  [verticalProperty.value]: `${props.offset}px`,
  zIndex: props.zIndex,
}))

const transitionName = computed(() =>
  isRight.value ? 'stx-notification-fade-right' : 'stx-notification-fade-left'
)

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function close() {
  visible.value = false
  props.onClose?.()
}

function onAfterLeave() {
  emit('destroy')
}

function onClick() {
  props.onClick?.()
}

function onMouseenter() {
  clearTimer()
}

function onMouseleave() {
  startTimer()
}

onMounted(() => {
  visible.value = true
  startTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})

defineExpose({ close, visible, notificationRef })
</script>

<template>
  <Transition :name="transitionName" @after-leave="onAfterLeave">
    <div
      v-show="visible"
      ref="notificationRef"
      :class="[
        ns.b(),
        ns.m(horizontalClass),
        type ? ns.m(type) : '',
        ns.is('closable', showClose),
      ]"
      :style="positionStyle"
      role="alert"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
      @click="onClick"
    >
      <!-- Type icon -->
      <span v-if="icon || type" :class="ns.e('icon')">
        <!-- Custom icon -->
        <component v-if="icon" :is="icon" />
        <!-- Success: checkmark circle -->
        <svg
          v-else-if="type === 'success'"
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
        <!-- Warning: exclamation triangle -->
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
        <!-- Info: info circle -->
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
        <!-- Error: X circle -->
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

      <!-- Body -->
      <div :class="ns.e('body')">
        <h3 v-if="title" :class="ns.e('title')">{{ title }}</h3>
        <p :class="ns.e('content')">
          <template v-if="typeof message === 'string'">{{ message }}</template>
          <component v-else :is="() => message" />
        </p>
      </div>

      <!-- Close button -->
      <button
        v-if="showClose"
        :class="ns.e('close')"
        @click.stop="close"
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
  </Transition>
</template>
