<script setup lang="ts">
import { useSlots } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { pageHeaderProps, pageHeaderEmits } from './page-header'

defineOptions({ name: 'StxPageHeader' })

const props = defineProps(pageHeaderProps)
const emit = defineEmits(pageHeaderEmits)
const slots = useSlots()

const ns = useNamespace('page-header')

function handleBack(evt: MouseEvent) {
  emit('back', evt)
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('left')" @click="handleBack">
      <div :class="ns.e('icon')">
        <slot name="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </slot>
      </div>
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div v-if="content || slots.content" :class="ns.e('content')">
      <slot name="content">{{ content }}</slot>
    </div>
    <div v-if="slots.extra" :class="ns.e('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>
