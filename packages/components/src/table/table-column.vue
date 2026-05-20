<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, watch } from 'vue'
import { tableColumnProps } from './table-column'
import { tableContextKey, type TableColumnConfig } from './constants'

defineOptions({ name: 'StxTableColumn' })

const props = defineProps(tableColumnProps)

const tableContext = inject(tableContextKey, undefined)

function buildConfig(): TableColumnConfig {
  return {
    type: props.type || '',
    prop: props.prop,
    label: props.label,
    width: props.width,
    minWidth: props.minWidth,
    fixed: props.fixed,
    sortable: props.sortable,
    sortOrders: props.sortOrders,
    align: props.align,
    headerAlign: props.headerAlign || props.align,
    showOverflowTooltip: props.showOverflowTooltip,
    formatter: props.formatter as TableColumnConfig['formatter'],
    className: props.className,
    labelClassName: props.labelClassName,
  }
}

onMounted(() => {
  tableContext?.registerColumn(buildConfig())
})

onBeforeUnmount(() => {
  const key = props.type === 'selection' ? '__selection__'
    : props.type === 'index' ? '__index__'
    : props.type === 'expand' ? '__expand__'
    : props.prop
  tableContext?.unregisterColumn(key)
})

watch(
  () => ({ ...props }),
  () => {
    // Unregister old and re-register with updated config
    const key = props.type === 'selection' ? '__selection__'
      : props.type === 'index' ? '__index__'
      : props.type === 'expand' ? '__expand__'
      : props.prop
    tableContext?.unregisterColumn(key)
    tableContext?.registerColumn(buildConfig())
  },
  { deep: true }
)
</script>

<template>
  <!-- Virtual component: renders nothing, registers column config via inject -->
</template>
