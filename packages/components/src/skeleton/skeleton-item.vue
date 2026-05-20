<script setup lang="ts">
import { useNamespace } from '@stellux/hooks'
import { skeletonItemProps } from './skeleton-item'

defineOptions({ name: 'StxSkeletonItem' })

const props = defineProps(skeletonItemProps)

const ns = useNamespace('skeleton-item')
</script>

<template>
  <div :class="[ns.b(), ns.m(variant)]">
    <slot />
  </div>
</template>
