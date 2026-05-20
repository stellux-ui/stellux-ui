<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { badgeProps } from './badge'

defineOptions({ name: 'StxBadge' })

const props = defineProps(badgeProps)
const slots = useSlots()

const ns = useNamespace('badge')

const displayValue = computed(() => {
  if (props.isDot) return ''
  if (typeof props.value === 'number' && props.value > props.max) {
    return `${props.max}+`
  }
  return `${props.value}`
})

const showContent = computed(() => {
  if (props.hidden) return false
  if (props.isDot) return true
  if (displayValue.value === '' || displayValue.value === 'undefined') return false
  if (displayValue.value === '0' && !props.showZero) return false
  return true
})

const hasDefaultSlot = computed(() => !!slots.default)

const contentClasses = computed(() => [
  ns.e('content'),
  ns.m(props.type),
  props.isDot && ns.is('dot'),
  !hasDefaultSlot.value && ns.is('fixed'),
])

const contentStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.backgroundColor = props.color
  }
  if (props.offset && props.offset.length === 2) {
    style.marginTop = `${props.offset[0]}px`
    style.marginRight = `${props.offset[1]}px`
  }
  return style
})
</script>

<template>
  <div :class="ns.b()">
    <slot />
    <sup
      v-show="showContent"
      :class="contentClasses"
      :style="contentStyle"
    >
      {{ displayValue }}
    </sup>
  </div>
</template>
