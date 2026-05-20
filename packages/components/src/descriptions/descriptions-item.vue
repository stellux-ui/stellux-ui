<script setup lang="ts">
import { descriptionsItemProps } from './descriptions-item'

defineOptions({ name: 'StxDescriptionsItem' })

defineProps(descriptionsItemProps)
</script>

<template>
  <template>
    <!-- This component is a virtual component; its VNodes are consumed by StxDescriptions -->
    <slot />
  </template>
</template>
