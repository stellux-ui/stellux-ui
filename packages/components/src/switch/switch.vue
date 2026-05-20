<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { useFormDisabled, useFormSize, useFormItem } from '@stellux/hooks'
import { switchProps, switchEmits } from './switch'

defineOptions({ name: 'StxSwitch' })

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const ns = useNamespace('switch')
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)
const { formItem } = useFormItem()

const isChecked = computed(() => props.modelValue === props.activeValue)

const switchStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    style['--stx-switch-width'] =
      typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.activeColor) {
    style['--stx-switch-on-color'] = props.activeColor
  }
  if (props.inactiveColor) {
    style['--stx-switch-off-color'] = props.inactiveColor
  }
  return style
})

function toggle() {
  const newVal = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newVal)
  emit('change', newVal)
  formItem?.validate('change')
}

async function handleClick() {
  if (actualDisabled.value || props.loading) return

  if (props.beforeChange) {
    let result: boolean
    try {
      result = await props.beforeChange()
    } catch {
      result = false
    }
    if (result) {
      toggle()
    }
  } else {
    toggle()
  }
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(actualSize),
      ns.is('checked', isChecked),
      ns.is('disabled', actualDisabled),
      ns.is('loading', loading),
    ]"
    :style="switchStyle"
    role="switch"
    :aria-checked="isChecked"
    :aria-disabled="actualDisabled"
    @click="handleClick"
  >
    <!-- Inactive label (left side, when not inlinePrompt) -->
    <span
      v-if="inactiveText && !inlinePrompt"
      :class="[ns.e('label'), ns.e('label--left'), ns.is('active', !isChecked)]"
    >
      <component v-if="inactiveIcon" :is="inactiveIcon" />
      <span v-else>{{ inactiveText }}</span>
    </span>

    <span :class="ns.e('core')">
      <!-- Inline prompt text inside the track -->
      <div v-if="inlinePrompt" :class="ns.e('inner')">
        <component v-if="isChecked && activeIcon" :is="activeIcon" />
        <component v-else-if="!isChecked && inactiveIcon" :is="inactiveIcon" />
        <template v-else>{{ isChecked ? activeText : inactiveText }}</template>
      </div>
      <!-- The sliding dot -->
      <span :class="ns.e('action')">
        <svg
          v-if="loading"
          :class="ns.e('loading-icon')"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
        </svg>
      </span>
    </span>

    <!-- Active label (right side) -->
    <span
      v-if="activeText && !inlinePrompt"
      :class="[ns.e('label'), ns.e('label--right'), ns.is('active', isChecked)]"
    >
      <component v-if="activeIcon" :is="activeIcon" />
      <span v-else>{{ activeText }}</span>
    </span>

    <input
      type="checkbox"
      :class="ns.e('input')"
      :name="name"
      :id="id"
      :disabled="actualDisabled"
      :checked="isChecked"
      :tabindex="tabindex"
      @change.stop
      @keydown.enter="handleClick"
    />
  </div>
</template>
