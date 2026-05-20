<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { anchorLinkProps } from './anchor-link'
import { anchorContextKey } from './constants'

defineOptions({ name: 'StxAnchorLink' })

const props = defineProps(anchorLinkProps)

const ns = useNamespace('anchor-link')

const anchor = inject(anchorContextKey)!

const isActive = computed(() => anchor.activeHref.value === props.href)

function handleClick(evt: MouseEvent) {
  anchor.handleLinkClick(evt, props.href)
}

onMounted(() => {
  anchor.registerLink(props.href)
})

onBeforeUnmount(() => {
  anchor.unregisterLink(props.href)
})
</script>

<template>
  <a
    :href="href"
    :class="[ns.b(), ns.is('active', isActive)]"
    @click="handleClick"
  >
    <slot>{{ title }}</slot>
  </a>
  <div v-if="$slots.sub" :class="ns.e('sub')">
    <slot name="sub" />
  </div>
</template>
