<script setup lang="ts">
  import { computed } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { iconProps } from './icon'

  defineOptions({ name: 'StxIcon' })

  const props = defineProps(iconProps)

  const ns = useNamespace('icon')

  const iconStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.size) {
      style.fontSize =
        typeof props.size === 'number' ? `${props.size}px` : props.size
    }
    if (props.color) {
      style.color = props.color
    }
    return style
  })
</script>

<template>
  <i :class="ns.b()" :style="iconStyle">
    <component v-if="component" :is="component" />
    <slot v-else />
  </i>
</template>
