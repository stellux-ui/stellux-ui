<script setup lang="ts">
  import { useNamespace } from '@stellux/hooks'
  import { footerProps } from './footer'

  defineOptions({ name: 'StxFooter' })

  defineProps(footerProps)
  const ns = useNamespace('footer')
</script>

<template>
  <footer :class="ns.b()" :style="{ height }">
    <slot />
  </footer>
</template>
