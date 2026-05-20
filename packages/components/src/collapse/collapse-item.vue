<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { collapseItemProps } from './collapse-item'
import { collapseContextKey } from './constants'
import StxCollapseTransition from '../collapse-transition/collapse-transition.vue'

defineOptions({ name: 'StxCollapseItem' })

const props = defineProps(collapseItemProps)

const ns = useNamespace('collapse-item')

const ctx = inject(collapseContextKey)!

const isActive = computed(() =>
  ctx.activeNames.value.includes(props.name!)
)

function handleHeaderClick() {
  if (props.disabled) return
  ctx.handleItemClick(props.name!)
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('active', isActive), ns.is('disabled', disabled)]"
  >
    <div
      role="tab"
      :aria-expanded="isActive"
      :class="ns.e('header')"
      @click="handleHeaderClick"
    >
      <slot name="title">{{ title }}</slot>
      <svg
        :class="[ns.e('arrow'), ns.is('active', isActive)]"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
    <stx-collapse-transition>
      <div v-show="isActive" role="tabpanel" :class="ns.e('wrap')">
        <div :class="ns.e('content')">
          <slot />
        </div>
      </div>
    </stx-collapse-transition>
  </div>
</template>
