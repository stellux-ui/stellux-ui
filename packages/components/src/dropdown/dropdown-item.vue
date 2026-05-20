<script setup lang="ts">
import { inject } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { dropdownItemProps } from './dropdown-item'
import { dropdownContextKey } from './constants'

defineOptions({ name: 'StxDropdownItem' })

const props = defineProps(dropdownItemProps)

const ns = useNamespace('dropdown-item')

const dropdown = inject(dropdownContextKey, undefined)

function handleClick(e: MouseEvent) {
  if (props.disabled) {
    e.stopPropagation()
    return
  }
  dropdown?.handleCommand(props.command)
}
</script>

<template>
  <li
    :class="[ns.b(), ns.is('disabled', disabled), ns.is('divided', divided)]"
    @click="handleClick"
  >
    <component :is="icon" v-if="icon" :class="ns.e('icon')" />
    <slot />
  </li>
</template>
