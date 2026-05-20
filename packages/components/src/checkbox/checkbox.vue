<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace, useFormDisabled, useFormSize, useFormItem } from '@stellux/hooks'
import { checkboxProps, checkboxEmits } from './checkbox'
import { checkboxGroupContextKey } from './constants'

defineOptions({ name: 'StxCheckbox' })

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const ns = useNamespace('checkbox')
const checkboxGroup = inject(checkboxGroupContextKey, undefined)
const { formItem } = useFormItem()

const isGroup = computed(() => !!checkboxGroup)

const isChecked = computed(() => {
  if (isGroup.value) {
    return checkboxGroup!.modelValue.value.includes(props.value)
  }
  return props.modelValue === props.trueValue
})

const isDisabled = computed(() => {
  if (checkboxGroup?.disabled) return true
  if (isGroup.value && !isChecked.value) {
    const max = checkboxGroup!.max
    if (max !== undefined && checkboxGroup!.modelValue.value.length >= max) {
      return true
    }
  }
  if (isGroup.value && isChecked.value) {
    const min = checkboxGroup!.min
    if (min !== undefined && checkboxGroup!.modelValue.value.length <= min) {
      return true
    }
  }
  return useFormDisabled(props).value
})

const checkboxSize = computed(() => {
  if (checkboxGroup?.size) return checkboxGroup.size
  return useFormSize(props).value
})

function handleChange(event: Event) {
  if (isDisabled.value) return

  if (isGroup.value) {
    const currentValue = [...checkboxGroup!.modelValue.value]
    const val = props.value
    const idx = currentValue.indexOf(val)

    if (idx !== -1) {
      currentValue.splice(idx, 1)
    } else {
      currentValue.push(val)
    }

    checkboxGroup!.changeEvent(currentValue)
  } else {
    const newVal = isChecked.value ? props.falseValue : props.trueValue
    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
  formItem?.validate('change')
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      checkboxSize !== 'default' ? ns.m(checkboxSize) : '',
      ns.is('checked', isChecked),
      ns.is('disabled', isDisabled),
      ns.is('bordered', border),
      ns.is('indeterminate', indeterminate),
    ]"
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed' : isChecked"
    :aria-disabled="isDisabled"
    :tabindex="isDisabled ? -1 : 0"
    @keydown.space.prevent="handleChange"
  >
    <span :class="[ns.e('input'), ns.is('checked', isChecked), ns.is('indeterminate', indeterminate)]">
      <input
        type="checkbox"
        :class="ns.e('original')"
        :value="value"
        :name="name || undefined"
        :disabled="isDisabled"
        :checked="isChecked"
        @change="handleChange"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="label || $slots.default" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
