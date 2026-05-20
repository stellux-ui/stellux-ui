<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { timelineItemProps } from './timeline-item'

defineOptions({ name: 'StxTimelineItem' })

const props = defineProps(timelineItemProps)

const ns = useNamespace('timeline-item')

const nodeStyle = computed(() => {
  if (!props.color) return {}
  if (props.hollow) {
    return {
      borderColor: props.color,
      backgroundColor: 'transparent',
    }
  }
  return {
    backgroundColor: props.color,
    borderColor: props.color,
  }
})
</script>

<template>
  <li :class="[ns.b(), ns.is('center', center)]">
    <div :class="ns.e('tail')" />
    <div
      :class="[
        ns.e('node'),
        ns.m(size),
        type && ns.m(type),
        ns.is('hollow', hollow),
      ]"
      :style="nodeStyle"
    >
      <slot name="dot">
        <component v-if="icon" :is="icon" />
      </slot>
    </div>
    <div :class="ns.e('wrapper')">
      <div
        v-if="!hideTimestamp && placement === 'top'"
        :class="[ns.e('timestamp'), ns.is('top', true)]"
      >
        {{ timestamp }}
      </div>
      <div :class="ns.e('content')">
        <slot />
      </div>
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        :class="[ns.e('timestamp'), ns.is('bottom', true)]"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>
