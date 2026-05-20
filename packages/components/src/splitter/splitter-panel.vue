<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { splitterPanelProps } from './splitter-panel'
import { splitterContextKey } from './constants'

defineOptions({ name: 'StxSplitterPanel' })

const props = defineProps(splitterPanelProps)
const ns = useNamespace('splitter')

const context = inject(splitterContextKey, undefined)

let panelIdCounter = 0
const panelId = `stx-splitter-panel-${Date.now()}-${panelIdCounter++}-${Math.random().toString(36).slice(2, 8)}`

onMounted(() => {
  context?.registerPanel(panelId, props.size, props.min, props.max)
})

onBeforeUnmount(() => {
  context?.unregisterPanel(panelId)
})

const panelStyle = computed(() => {
  return context?.getPanelStyle(panelId) ?? {}
})
</script>

<template>
  <div :class="ns.e('panel')" :style="panelStyle">
    <slot />
  </div>
</template>
