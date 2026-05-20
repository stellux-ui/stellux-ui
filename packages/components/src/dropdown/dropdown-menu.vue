<script setup lang="ts">
import { useNamespace } from '@stellux/hooks'

defineOptions({ name: 'StxDropdownMenu' })

const ns = useNamespace('dropdown-menu')
</script>

<template>
  <ul :class="ns.b()">
    <slot />
  </ul>
</template>
