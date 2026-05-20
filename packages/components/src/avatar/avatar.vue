<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { avatarProps, avatarEmits } from './avatar'

defineOptions({ name: 'StxAvatar' })

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const ns = useNamespace('avatar')

const hasError = ref(false)

const sizeClass = computed(() => {
  if (typeof props.size === 'string' && props.size) {
    return ns.m(props.size)
  }
  return ''
})

const sizeStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${props.size / 2}px`,
    }
  }
  return {}
})

function handleError(evt: Event) {
  hasError.value = true
  emit('error', evt)
}

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)
</script>

<template>
  <span
    :class="[ns.b(), ns.m(shape), sizeClass]"
    :style="sizeStyle"
  >
    <img
      v-if="src && !hasError"
      :src="src"
      :srcset="srcSet"
      :alt="alt"
      :style="{ objectFit: fit }"
      @error="handleError"
    />
    <component v-else-if="icon" :is="icon" />
    <slot v-else />
  </span>
</template>
