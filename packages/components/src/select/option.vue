<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, watch } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { optionProps } from './option'
import { selectContextKey } from './constants'

defineOptions({ name: 'StxOption' })

const props = defineProps(optionProps)
const ns = useNamespace('select-option')
const ctx = inject(selectContextKey)!

const displayLabel = computed(() =>
  props.label !== '' ? String(props.label) : String(props.value),
)

const isSelected = computed(() => ctx.isSelected(props.value))
const isHovered = computed(() => ctx.hoveredValue.value === props.value)
const isVisible = computed(() => {
  if (!ctx.filterQuery.value) return true
  return displayLabel.value
    .toLowerCase()
    .includes(ctx.filterQuery.value.toLowerCase())
})

function handleClick() {
  if (props.disabled) return
  ctx.handleOptionSelect(props.value, displayLabel.value)
}

function handleMouseEnter() {
  if (!props.disabled) ctx.setHovered(props.value)
}

onMounted(() => {
  ctx.registerOption(props.value, {
    label: displayLabel.value,
    disabled: props.disabled,
  })
})

onBeforeUnmount(() => {
  ctx.unregisterOption(props.value)
})

watch(
  () => [props.value, displayLabel.value, props.disabled] as const,
  ([val, label, disabled], [oldVal]) => {
    if (oldVal !== val) {
      ctx.unregisterOption(oldVal)
    }
    ctx.registerOption(val, { label, disabled })
  },
)
</script>

<template>
  <li
    v-show="isVisible"
    :class="[
      ns.b(),
      ns.is('selected', isSelected),
      ns.is('disabled', disabled),
      ns.is('hover', isHovered),
    ]"
    @click.stop="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <slot>
      <span>{{ displayLabel }}</span>
    </slot>
    <svg
      v-if="isSelected"
      :class="ns.e('check')"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  </li>
</template>
