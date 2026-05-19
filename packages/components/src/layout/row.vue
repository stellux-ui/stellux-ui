<script setup lang="ts">
  import { computed, provide } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { rowProps } from './row'
  import { rowContextKey } from './constants'

  defineOptions({ name: 'StxRow' })

  const props = defineProps(rowProps)
  const ns = useNamespace('row')

  provide(rowContextKey, { gutter: props.gutter })

  const style = computed(() => {
    if (!props.gutter) return {}
    const half = `-${props.gutter / 2}px`
    return { marginLeft: half, marginRight: half }
  })

  const classes = computed(() => [
    ns.b(),
    props.justify !== 'start' && ns.is(`justify-${props.justify}`, true),
    props.align && ns.is(`align-${props.align}`, true)
  ])
</script>

<template>
  <component :is="tag" :class="classes" :style="style">
    <slot />
  </component>
</template>
