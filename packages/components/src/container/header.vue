<script setup lang="ts">
  import { useNamespace } from '@stellux/hooks'
  import { headerProps } from './header'

  defineOptions({ name: 'StxHeader' })

  defineProps(headerProps)
  const ns = useNamespace('header')
</script>

<template>
  <header :class="ns.b()" :style="{ height }">
    <slot />
  </header>
</template>
