<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, type ComponentPublicInstance } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { segmentedProps, segmentedEmits } from './segmented'
import type { SegmentedOption } from './segmented'

defineOptions({ name: 'StxSegmented' })

const props = defineProps(segmentedProps)
const emit = defineEmits(segmentedEmits)

const ns = useNamespace('segmented')

const itemRefs = ref<(HTMLElement | null)[]>([])

const thumbStyle = ref<Record<string, string>>({
  display: 'none',
})

const normalizedOptions = computed<SegmentedOption[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return opt as SegmentedOption
    }
    return { label: String(opt), value: opt as string | number }
  })
})

function setItemRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el) {
    itemRefs.value[index] = (el as ComponentPublicInstance).$el ?? (el as HTMLElement)
  } else {
    itemRefs.value[index] = null
  }
}

function updateThumb() {
  const activeIndex = normalizedOptions.value.findIndex(
    (opt) => opt.value === props.modelValue,
  )
  if (activeIndex < 0 || !itemRefs.value[activeIndex]) {
    thumbStyle.value = { display: 'none' }
    return
  }

  const activeEl = itemRefs.value[activeIndex]!
  const parentEl = activeEl.parentElement
  if (!parentEl) return

  const parentRect = parentEl.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()

  thumbStyle.value = {
    left: `${activeRect.left - parentRect.left}px`,
    width: `${activeRect.width}px`,
    display: '',
  }
}

function handleSelect(opt: SegmentedOption) {
  if (opt.disabled || props.disabled) return
  emit('update:modelValue', opt.value)
  emit('change', opt.value)
}

watch(
  () => props.modelValue,
  () => {
    nextTick(updateThumb)
  },
)

onMounted(() => {
  nextTick(updateThumb)
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('block', block),
      ns.is('disabled', disabled),
    ]"
  >
    <div :class="ns.e('group')">
      <div :class="ns.e('thumb')" :style="thumbStyle" />
      <label
        v-for="(opt, index) in normalizedOptions"
        :key="opt.value"
        :ref="(el) => setItemRef(el, index)"
        :class="[
          ns.e('item'),
          ns.is('active', opt.value === modelValue),
          ns.is('disabled', opt.disabled || disabled),
        ]"
        @click="handleSelect(opt)"
      >
        <input
          type="radio"
          :class="ns.e('input')"
          :value="opt.value"
          :checked="opt.value === modelValue"
          :disabled="opt.disabled || disabled"
        />
        <component
          v-if="opt.icon"
          :is="opt.icon"
          :class="ns.e('item-icon')"
        />
        <span :class="ns.e('item-label')">{{ opt.label }}</span>
      </label>
    </div>
  </div>
</template>
