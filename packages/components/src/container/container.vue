<script setup lang="ts">
  import { computed, useSlots, type VNode, type Component } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { containerProps } from './container'

  defineOptions({ name: 'StxContainer' })

  const props = defineProps(containerProps)
  const slots = useSlots()
  const ns = useNamespace('container')

  const isVertical = computed(() => {
    if (props.direction) return props.direction === 'vertical'
    const children = (slots.default?.() ?? []) as VNode[]
    return children.some(vnode => {
      const tag = (vnode.type as Component)?.name
      return tag === 'StxHeader' || tag === 'StxFooter'
    })
  })
</script>

<template>
  <section :class="[ns.b(), ns.is('vertical', isVertical)]">
    <slot />
  </section>
</template>
