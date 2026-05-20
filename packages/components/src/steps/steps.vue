<script setup lang="ts">
import { provide, ref, toRefs, reactive } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { stepsProps } from './steps'
import { stepsContextKey } from './constants'

defineOptions({ name: 'StxSteps' })

const props = defineProps(stepsProps)

const ns = useNamespace('steps')

const { active, direction, processStatus, finishStatus, space, simple } = toRefs(props)

const stepUids = ref<number[]>([])

function registerStep(uid: number): number {
  stepUids.value.push(uid)
  return stepUids.value.length - 1
}

function unregisterStep(uid: number) {
  const idx = stepUids.value.indexOf(uid)
  if (idx !== -1) {
    stepUids.value.splice(idx, 1)
  }
}

provide(
  stepsContextKey,
  reactive({
    active,
    direction,
    processStatus,
    finishStatus,
    space,
    simple,
    stepsCount: ref(0),
    registerStep,
    unregisterStep,
  }),
)
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(direction),
      ns.is('simple', simple),
      ns.is('center', alignCenter),
    ]"
  >
    <slot />
  </div>
</template>
