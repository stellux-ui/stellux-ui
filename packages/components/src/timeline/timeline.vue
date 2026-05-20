<script setup lang="ts">
import { useNamespace } from '@stellux/hooks'

defineOptions({ name: 'StxTimeline' })

const ns = useNamespace('timeline')
</script>

<template>
  <ul :class="ns.b()">
    <slot />
  </ul>
</template>
