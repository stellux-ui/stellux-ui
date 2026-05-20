<script setup lang="ts">
import { useNamespace } from '@stellux/hooks'
import { optionGroupProps } from './option-group'

defineOptions({ name: 'StxOptionGroup' })
defineProps(optionGroupProps)
const ns = useNamespace('select-group')
</script>

<template>
  <li :class="ns.b()">
    <div :class="ns.e('title')">{{ label }}</div>
    <ul :class="ns.e('list')">
      <slot />
    </ul>
  </li>
</template>
