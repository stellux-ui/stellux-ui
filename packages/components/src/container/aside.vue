<script setup lang="ts">
  import { useNamespace } from '@stellux/hooks'
  import { asideProps } from './aside'

  defineOptions({ name: 'StxAside' })

  defineProps(asideProps)
  const ns = useNamespace('aside')
</script>

<template>
  <aside :class="ns.b()" :style="{ width }">
    <slot />
  </aside>
</template>
