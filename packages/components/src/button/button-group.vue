<script setup lang="ts">
  import { computed, provide, reactive, toRef } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { buttonGroupProps } from './button-group'
  import { buttonGroupContextKey } from './constants'

  defineOptions({ name: 'StxButtonGroup' })

  const props = defineProps(buttonGroupProps)
  const ns = useNamespace('button-group')

  provide(
    buttonGroupContextKey,
    reactive({
      type: toRef(props, 'type'),
      size: toRef(props, 'size')
    })
  )

  const classes = computed(() => [ns.b(), props.direction === 'vertical' && ns.m('vertical')])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
