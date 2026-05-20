<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'

defineOptions({ name: 'StxLoading' })

const props = withDefaults(
  defineProps<{
    text?: string
    background?: string
    fullscreen?: boolean
    customClass?: string
  }>(),
  {
    text: '',
    background: '',
    fullscreen: false,
    customClass: '',
  }
)

const ns = useNamespace('loading')

const loadingStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.background) {
    style.backgroundColor = props.background
  }
  return style
})
</script>

<template>
  <div
    :class="[ns.b(), ns.is('fullscreen', fullscreen), customClass]"
    :style="loadingStyle"
  >
    <div :class="ns.e('spinner')">
      <svg :class="ns.e('circular')" viewBox="0 0 50 50">
        <circle
          :class="ns.e('path')"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        />
      </svg>
      <p v-if="text" :class="ns.e('text')">{{ text }}</p>
    </div>
  </div>
</template>
