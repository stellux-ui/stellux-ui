<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { colProps, type ResponsiveValue } from './col'
  import { rowContextKey } from './constants'

  defineOptions({ name: 'StxCol' })

  const props = defineProps(colProps)
  const ns = useNamespace('col')
  const rowContext = inject(rowContextKey, { gutter: 0 })

  const style = computed(() => {
    if (!rowContext.gutter) return {}
    const half = `${rowContext.gutter / 2}px`
    return { paddingLeft: half, paddingRight: half }
  })

  function responsiveClasses(breakpoint: string, val: ResponsiveValue | undefined) {
    if (val === undefined) return []
    if (typeof val === 'number') {
      return [`stx-col-${breakpoint}-${val}`]
    }
    const cls: string[] = []
    if (val.span !== undefined) cls.push(`stx-col-${breakpoint}-${val.span}`)
    if (val.offset) cls.push(`stx-col-${breakpoint}-offset-${val.offset}`)
    return cls
  }

  const classes = computed(() => [
    ns.b(),
    props.span !== undefined && `stx-col-${props.span}`,
    props.offset && `stx-col-offset-${props.offset}`,
    props.push && `stx-col-push-${props.push}`,
    props.pull && `stx-col-pull-${props.pull}`,
    ...responsiveClasses('xs', props.xs),
    ...responsiveClasses('sm', props.sm),
    ...responsiveClasses('md', props.md),
    ...responsiveClasses('lg', props.lg),
    ...responsiveClasses('xl', props.xl)
  ])
</script>

<template>
  <component :is="tag" :class="classes" :style="style">
    <slot />
  </component>
</template>
