<script setup lang="ts">
import { ref, computed, watch, provide } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { collapseProps, collapseEmits } from './collapse'
import { collapseContextKey } from './constants'

defineOptions({ name: 'StxCollapse' })

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const ns = useNamespace('collapse')

function normalizeModelValue(
  val: (string | number)[] | string | number
): (string | number)[] {
  if (Array.isArray(val)) return val
  return val !== '' && val !== undefined && val !== null ? [val] : []
}

const activeNames = ref<(string | number)[]>(
  normalizeModelValue(props.modelValue)
)

watch(
  () => props.modelValue,
  (val) => {
    activeNames.value = normalizeModelValue(val)
  }
)

function handleItemClick(name: string | number) {
  if (props.accordion) {
    const isActive = activeNames.value[0] === name
    const newVal = isActive ? [] : [name]
    activeNames.value = newVal
    emit('update:modelValue', newVal)
    emit('change', newVal)
  } else {
    const index = activeNames.value.indexOf(name)
    const newVal = [...activeNames.value]
    if (index > -1) {
      newVal.splice(index, 1)
    } else {
      newVal.push(name)
    }
    activeNames.value = newVal
    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div :class="ns.b()" role="tablist" aria-multiselectable="true">
    <slot />
  </div>
</template>
