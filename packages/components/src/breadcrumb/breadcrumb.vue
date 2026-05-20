<script setup lang="ts">
import { provide, toRefs } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { breadcrumbProps } from './breadcrumb'
import { breadcrumbContextKey } from './constants'

defineOptions({ name: 'StxBreadcrumb' })

const props = defineProps(breadcrumbProps)

const ns = useNamespace('breadcrumb')

const { separator, separatorIcon } = toRefs(props)

provide(breadcrumbContextKey, {
  separator: separator.value,
  separatorIcon: separatorIcon.value,
})
</script>

<template>
  <nav :class="ns.b()" aria-label="Breadcrumb">
    <ol :class="ns.e('list')">
      <slot />
    </ol>
  </nav>
</template>
