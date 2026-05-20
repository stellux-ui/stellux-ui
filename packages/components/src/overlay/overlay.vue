<script setup lang="ts">
import { useNamespace } from '@stellux/hooks'
import { overlayProps, overlayEmits } from './overlay'

defineOptions({ name: 'StxOverlay' })
defineProps(overlayProps)
const emit = defineEmits(overlayEmits)
const ns = useNamespace('overlay')

function handleClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <div
    v-if="mask"
    :class="ns.b()"
    :style="zIndex != null ? { zIndex } : undefined"
    @click.self="handleClick"
  >
    <slot />
  </div>
  <slot v-else />
</template>
