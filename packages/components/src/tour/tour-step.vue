<script setup lang="ts">
import { inject, getCurrentInstance, onMounted, onBeforeUnmount, watch, toRefs } from 'vue'
import { tourStepProps } from './tour-step'
import { tourContextKey } from './constants'
import type { TourStepData } from './constants'

defineOptions({ name: 'StxTourStep' })

const props = defineProps(tourStepProps)

const tourContext = inject(tourContextKey)!
const instance = getCurrentInstance()!

function getStepData(): TourStepData {
  return {
    uid: instance.uid,
    target: props.target,
    title: props.title,
    description: props.description,
    placement: props.placement,
    showArrow: props.showArrow,
    mask: props.mask,
    type: props.type,
    nextButtonProps: props.nextButtonProps,
    prevButtonProps: props.prevButtonProps,
  }
}

onMounted(() => {
  tourContext.registerStep(getStepData())
})

onBeforeUnmount(() => {
  tourContext.unregisterStep(instance.uid)
})

watch(
  () => ({ ...props }),
  () => {
    tourContext.updateStep(instance.uid, getStepData())
  },
  { deep: true },
)
</script>

<template>
  <slot />
</template>
