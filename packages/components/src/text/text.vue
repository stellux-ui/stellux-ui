<script setup lang="ts">
  import { computed } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { textProps } from './text'

  defineOptions({ name: 'StxText' })

  const props = defineProps(textProps)

  const ns = useNamespace('text')

  const classes = computed(() => [
    ns.b(),
    props.type && ns.m(props.type),
    props.size !== 'default' && ns.m(props.size),
    ns.is('truncated', props.truncated)
  ])

  const textStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.lineClamp) {
      style.display = '-webkit-box'
      style['-webkit-line-clamp'] = String(props.lineClamp)
      style['-webkit-box-orient'] = 'vertical'
      style.overflow = 'hidden'
    }
    return style
  })
</script>

<template>
  <component :is="tag" :class="classes" :style="textStyle">
    <slot />
  </component>
</template>
