<script setup lang="ts">
import { inject, computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { tabPaneProps } from './tab-pane'
import { tabsContextKey } from './constants'

defineOptions({ name: 'StxTabPane' })

const props = defineProps(tabPaneProps)
const ns = useNamespace('tab-pane')
const ctx = inject(tabsContextKey)!

const isActive = computed(() => ctx.activeTab.value === props.name)
const loaded = ref(false)

watch(isActive, (val) => { if (val) loaded.value = true }, { immediate: true })

onMounted(() => {
  ctx.registerPane({
    name: props.name,
    label: props.label,
    disabled: props.disabled,
    closable: props.closable,
    lazy: props.lazy,
  })
})

onBeforeUnmount(() => {
  ctx.unregisterPane(props.name)
})

// Watch props changes and re-register
watch(
  () => [props.label, props.disabled, props.closable, props.lazy],
  () => {
    ctx.unregisterPane(props.name)
    ctx.registerPane({
      name: props.name,
      label: props.label,
      disabled: props.disabled,
      closable: props.closable,
      lazy: props.lazy,
    })
  },
)
</script>

<template>
  <div
    v-if="!lazy || loaded"
    v-show="isActive"
    :class="ns.b()"
    role="tabpanel"
  >
    <slot />
  </div>
</template>
