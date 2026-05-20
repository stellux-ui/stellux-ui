<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { statisticProps } from './statistic'

defineOptions({ name: 'StxStatistic' })

const props = defineProps(statisticProps)

const ns = useNamespace('statistic')

const displayValue = computed(() => {
  const num = Number(props.value)
  if (Number.isNaN(num)) return String(props.value)

  const fixed = num.toFixed(props.precision)
  const [integerPart, decimalPart] = fixed.split('.')

  // Add group separator every 3 digits to the integer part
  const isNegative = integerPart.startsWith('-')
  const absInteger = isNegative ? integerPart.slice(1) : integerPart
  const grouped = absInteger.replace(/\B(?=(\d{3})+(?!\d))/g, props.groupSeparator)
  const signedGrouped = isNegative ? `-${grouped}` : grouped

  if (props.precision > 0 && decimalPart) {
    return `${signedGrouped}${props.decimalSeparator}${decimalPart}`
  }
  return signedGrouped
})
</script>

<template>
  <div :class="ns.b()">
    <div v-if="title || $slots.title" :class="ns.e('head')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="ns.e('content')" :style="valueStyle">
      <span v-if="prefix || $slots.prefix" :class="ns.e('prefix')">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span :class="ns.e('value')">{{ displayValue }}</span>
      <span v-if="suffix || $slots.suffix" :class="ns.e('suffix')">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
