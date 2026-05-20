<script setup lang="ts">
import { useNamespace } from '@stellux/hooks'
import { resultProps } from './result'

defineOptions({ name: 'StxResult' })

const props = defineProps(resultProps)

const ns = useNamespace('result')
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('icon')">
      <slot name="icon">
        <!-- Success: check circle -->
        <svg
          v-if="icon === 'success'"
          :class="ns.m('success')"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="3" />
          <path d="M20 33l8 8 16-16" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <!-- Warning: exclamation triangle -->
        <svg
          v-else-if="icon === 'warning'"
          :class="ns.m('warning')"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30.27 6.72L3.64 54a2 2 0 001.73 3h53.26a2 2 0 001.73-3L33.73 6.72a2 2 0 00-3.46 0z" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
          <line x1="32" y1="24" x2="32" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          <circle cx="32" cy="48" r="2" fill="currentColor" />
        </svg>
        <!-- Error: X circle -->
        <svg
          v-else-if="icon === 'error'"
          :class="ns.m('error')"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="3" />
          <path d="M22 22l20 20M42 22L22 42" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
        <!-- Info: info circle (default) -->
        <svg
          v-else
          :class="ns.m('info')"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="3" />
          <line x1="32" y1="28" x2="32" y2="46" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          <circle cx="32" cy="20" r="2" fill="currentColor" />
        </svg>
      </slot>
    </div>
    <div v-if="title || $slots.title" :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="subTitle || $slots['sub-title']" :class="ns.e('subtitle')">
      <slot name="sub-title">{{ subTitle }}</slot>
    </div>
    <div v-if="$slots.extra" :class="ns.e('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>
