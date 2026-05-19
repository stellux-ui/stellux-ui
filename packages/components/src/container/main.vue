<script setup lang="ts">
  import { useNamespace } from '@stellux/hooks'

  defineOptions({ name: 'StxMain' })

  const ns = useNamespace('main')
</script>

<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>
