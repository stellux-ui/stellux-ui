<script setup lang="ts">
  import { computed, useSlots } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { dividerProps } from './divider'

  defineOptions({ name: 'StxDivider' })

  const props = defineProps(dividerProps)
  const slots = useSlots()

  const ns = useNamespace('divider')

  const hasContent = computed(
    () => slots.default && props.direction === 'horizontal'
  )

  const classes = computed(() => [
    ns.b(),
    ns.m(props.direction)
  ])

  const dividerStyle = computed(() => ({
    '--border-style': props.borderStyle
  }))
</script>

<template>
  <div
    role="separator"
    :class="classes"
    :style="dividerStyle"
  >
    <div
      v-if="hasContent"
      :class="[ns.e('text'), ns.is(contentPosition)]"
    >
      <slot />
    </div>
  </div>
</template>
