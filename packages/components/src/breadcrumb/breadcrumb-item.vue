<script setup lang="ts">
import { inject, computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { breadcrumbItemProps } from './breadcrumb-item'
import { breadcrumbContextKey } from './constants'

defineOptions({ name: 'StxBreadcrumbItem' })

const props = defineProps(breadcrumbItemProps)

const ns = useNamespace('breadcrumb-item')

const breadcrumb = inject(breadcrumbContextKey, { separator: '/', separatorIcon: undefined })

const isLink = computed(() => !!props.to)
</script>

<template>
  <li :class="ns.b()">
    <a
      v-if="isLink"
      :class="ns.e('inner')"
      :href="typeof to === 'string' ? to : undefined"
      role="link"
    >
      <slot />
    </a>
    <span v-else :class="ns.e('inner')">
      <slot />
    </span>
    <span :class="ns.e('separator')">
      <component :is="breadcrumb.separatorIcon" v-if="breadcrumb.separatorIcon" />
      <template v-else>{{ breadcrumb.separator }}</template>
    </span>
  </li>
</template>
