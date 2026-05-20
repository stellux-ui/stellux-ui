<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { menuItemGroupProps } from './menu-item-group'
import { menuContextKey, subMenuContextKey } from './constants'

defineOptions({ name: 'StxMenuItemGroup' })

defineProps(menuItemGroupProps)

const ns = useNamespace('menu-item-group')

const menuCtx = inject(menuContextKey, undefined)
const subMenuCtx = inject(subMenuContextKey, undefined)

const titlePaddingStyle = computed(() => {
  if (!menuCtx || menuCtx.mode.value === 'horizontal') return {}
  if (menuCtx.isCollapsed.value) return {}
  const level = subMenuCtx ? subMenuCtx.level : 0
  return { paddingLeft: `${20 + level * 20}px` }
})
</script>

<template>
  <li :class="ns.b()">
    <div :class="ns.e('title')" :style="titlePaddingStyle">
      <slot name="title">{{ title }}</slot>
    </div>
    <ul :class="ns.e('list')">
      <slot />
    </ul>
  </li>
</template>
