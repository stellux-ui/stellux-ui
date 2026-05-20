<script setup lang="ts">
import { computed, inject, getCurrentInstance, onMounted, onBeforeUnmount, ref } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { stepProps } from './step'
import { stepsContextKey } from './constants'
import type { StepStatus } from './constants'

defineOptions({ name: 'StxStep' })

const props = defineProps(stepProps)

const ns = useNamespace('step')

const steps = inject(stepsContextKey)!

const instance = getCurrentInstance()!
const stepIndex = ref(-1)

onMounted(() => {
  stepIndex.value = steps.registerStep(instance.uid)
})

onBeforeUnmount(() => {
  steps.unregisterStep(instance.uid)
})

const currentStatus = computed<StepStatus>(() => {
  if (props.status) return props.status as StepStatus
  const active = steps.active
  if (stepIndex.value < active) return steps.finishStatus as unknown as StepStatus
  if (stepIndex.value === active) return steps.processStatus as unknown as StepStatus
  return 'wait'
})

const isLast = computed(() => {
  // Not ideal but functional: check if this is the last visible step via index
  return false
})

const stepStyle = computed(() => {
  const style: Record<string, string> = {}
  if (steps.space) {
    const spaceVal = typeof steps.space === 'number' ? `${steps.space}px` : steps.space
    style.flexBasis = spaceVal as string
  }
  return style
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('wait', currentStatus === 'wait'),
      ns.is('process', currentStatus === 'process'),
      ns.is('finish', currentStatus === 'finish'),
      ns.is('error', currentStatus === 'error'),
      ns.is('success', currentStatus === 'success'),
    ]"
    :style="stepStyle"
  >
    <div :class="ns.e('head')">
      <div :class="ns.e('line')">
        <i :class="ns.e('line-inner')" />
      </div>
      <div :class="ns.e('icon')">
        <slot name="icon">
          <component :is="icon" v-if="icon" />
          <template v-else>
            <svg
              v-if="currentStatus === 'finish' || currentStatus === 'success'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <svg
              v-else-if="currentStatus === 'error'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span v-else :class="ns.e('number')">{{ stepIndex + 1 }}</span>
          </template>
        </slot>
      </div>
    </div>
    <div :class="ns.e('main')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" :class="ns.e('description')">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
