<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { alertProps, alertEmits } from './alert'

defineOptions({ name: 'StxAlert' })

const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)

const ns = useNamespace('alert')
const visible = ref(true)

const classes = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.effect),
  ns.is('center', props.center),
])

function handleClose(evt: MouseEvent) {
  visible.value = false
  emit('close', evt)
}
</script>

<template>
  <Transition name="stx-fade-in-linear">
    <div
      v-if="visible"
      :class="classes"
      role="alert"
    >
      <!-- Icon -->
      <div v-if="showIcon" :class="ns.e('icon')">
        <!-- Success: checkmark circle -->
        <svg
          v-if="type === 'success'"
          viewBox="0 0 24 24"
          width="18"
          height="18"
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
          width="18"
          height="18"
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
          width="18"
          height="18"
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
          v-else
          viewBox="0 0 24 24"
          width="18"
          height="18"
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
      </div>

      <!-- Content -->
      <div :class="ns.e('content')">
        <span v-if="title || $slots.title" :class="ns.e('title')">
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="description || $slots.default" :class="ns.e('description')">
          <slot>{{ description }}</slot>
        </p>
      </div>

      <!-- Close button -->
      <span
        v-if="closable || closeText"
        :class="ns.e('close-btn')"
        @click="handleClose"
      >
        <template v-if="closeText">{{ closeText }}</template>
        <svg
          v-else
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
  </Transition>
</template>
