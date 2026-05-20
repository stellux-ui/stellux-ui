<script setup lang="ts">
  import {
    computed,
    useSlots,
    type VNode,
    Comment,
    Fragment,
    Text
  } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { spaceProps } from './space'

  defineOptions({ name: 'StxSpace' })

  const props = defineProps(spaceProps)
  const slots = useSlots()

  const ns = useNamespace('space')

  const sizeMap: Record<string, number> = {
    small: 8,
    default: 12,
    large: 16
  }

  function flattenChildren(children: VNode[]): VNode[] {
    const result: VNode[] = []
    children.forEach((child) => {
      if (child.type === Comment) return
      if (Array.isArray(child.children)) {
        result.push(...flattenChildren(child.children as VNode[]))
      } else if (child.type === Fragment) {
        if (Array.isArray(child.children)) {
          result.push(...flattenChildren(child.children as VNode[]))
        }
      } else {
        result.push(child)
      }
    })
    return result
  }

  const filteredChildren = computed(() => {
    const children = slots.default?.() ?? []
    return flattenChildren(children)
  })

  const classes = computed(() => [
    ns.b(),
    ns.m(props.direction),
    ns.is('wrap', props.wrap),
    ns.is('fill', props.fill)
  ])

  const spaceStyle = computed(() => {
    const style: Record<string, string> = {}
    style.alignItems = props.alignment

    if (Array.isArray(props.size)) {
      style.columnGap = `${props.size[0]}px`
      style.rowGap = `${props.size[1]}px`
    } else if (typeof props.size === 'number') {
      style.gap = `${props.size}px`
    } else {
      const gapValue = sizeMap[props.size] ?? sizeMap.default
      style.gap = `${gapValue}px`
    }

    return style
  })

  const itemStyle = computed(() => {
    if (props.fill) {
      return { flexGrow: 1, minWidth: `${props.fillRatio}%` }
    }
    return {}
  })
</script>

<template>
  <div :class="classes" :style="spaceStyle">
    <template v-for="(child, index) in filteredChildren" :key="index">
      <div :class="ns.e('item')" :style="itemStyle">
        <component :is="child" />
      </div>
      <div
        v-if="spacer && index < filteredChildren.length - 1"
        :class="ns.e('spacer')"
      >
        <component v-if="typeof spacer !== 'string'" :is="spacer" />
        <template v-else>{{ spacer }}</template>
      </div>
    </template>
  </div>
</template>
