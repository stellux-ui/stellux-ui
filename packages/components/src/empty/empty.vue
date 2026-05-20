<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { emptyProps } from './empty'

defineOptions({ name: 'StxEmpty' })

const props = defineProps(emptyProps)

const ns = useNamespace('empty')

const imageStyle = computed(() => ({
  width: `${props.imageSize}px`,
}))
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('image')" :style="imageStyle">
      <slot name="image">
        <img v-if="image" :src="image" />
        <svg
          v-else
          viewBox="0 0 200 160"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <rect x="40" y="30" width="120" height="90" rx="4" stroke="#c0c4cc" stroke-width="2" />
          <rect x="50" y="40" width="100" height="10" rx="2" fill="#e4e7ed" />
          <rect x="50" y="58" width="80" height="10" rx="2" fill="#e4e7ed" />
          <rect x="50" y="76" width="60" height="10" rx="2" fill="#e4e7ed" />
          <path d="M80 130 l20 -20 l20 20" stroke="#c0c4cc" stroke-width="2" fill="none" />
          <circle cx="100" cy="140" r="6" fill="#e4e7ed" />
        </svg>
      </slot>
    </div>
    <div v-if="description || $slots.description" :class="ns.e('description')">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="$slots.default" :class="ns.e('bottom')">
      <slot />
    </div>
  </div>
</template>
