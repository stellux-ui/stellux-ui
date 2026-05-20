<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { menuItemProps, menuItemEmits } from './menu-item'
import { menuContextKey, subMenuContextKey } from './constants'
import StxTooltip from '../tooltip/tooltip.vue'

defineOptions({ name: 'StxMenuItem' })

const props = defineProps(menuItemProps)
const emit = defineEmits(menuItemEmits)

const ns = useNamespace('menu-item')

const menuCtx = inject(menuContextKey)!
const subMenuCtx = inject(subMenuContextKey, undefined)

const isActive = computed(() => menuCtx.activeIndex.value === props.index)

const isCollapsedVertical = computed(
  () => menuCtx.mode.value === 'vertical' && menuCtx.isCollapsed.value
)

const paddingStyle = computed(() => {
  if (menuCtx.mode.value === 'horizontal') return {}
  if (menuCtx.isCollapsed.value) return {}
  const level = subMenuCtx ? subMenuCtx.level : 0
  return { paddingLeft: `${20 + level * 20}px` }
})

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (isActive.value && menuCtx) {
    // Active text color is handled via CSS, but inline colors override if set
  }
  return { ...style, ...paddingStyle.value }
})

function handleClick() {
  if (props.disabled) return
  menuCtx.handleSelect(props.index!)
  emit('click', { index: props.index!, indexPath: [props.index!] })
}
</script>

<template>
  <stx-tooltip
    v-if="isCollapsedVertical"
    :content="$slots.title ? undefined : ''"
    placement="right"
    :show-arrow="false"
    effect="dark"
  >
    <template #default>
      <li
        :class="[ns.b(), ns.is('active', isActive), ns.is('disabled', disabled)]"
        :style="itemStyle"
        role="menuitem"
        @click="handleClick"
      >
        <slot name="icon" />
        <span :class="ns.e('content')">
          <slot />
        </span>
      </li>
    </template>
    <template #content>
      <slot name="title">
        <slot />
      </slot>
    </template>
  </stx-tooltip>
  <li
    v-else
    :class="[ns.b(), ns.is('active', isActive), ns.is('disabled', disabled)]"
    :style="itemStyle"
    role="menuitem"
    @click="handleClick"
  >
    <slot name="icon" />
    <span :class="ns.e('content')">
      <slot />
    </span>
  </li>
</template>
