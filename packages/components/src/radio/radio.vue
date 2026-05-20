<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace, useFormDisabled, useFormSize, useFormItem } from '@stellux/hooks'
import { radioProps, radioEmits } from './radio'
import { radioGroupContextKey } from './constants'

defineOptions({ name: 'StxRadio' })

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const ns = useNamespace('radio')
const radioGroup = inject(radioGroupContextKey, undefined)
const { formItem } = useFormItem()

const isGroup = computed(() => !!radioGroup)

const actualModelValue = computed(() =>
  isGroup.value ? radioGroup!.modelValue : props.modelValue,
)

const isChecked = computed(() => actualModelValue.value === props.value)

const isDisabled = computed(() => {
  if (radioGroup?.disabled) return true
  return useFormDisabled(props).value
})

const radioSize = computed(() => {
  if (radioGroup?.size) return radioGroup.size
  return useFormSize(props).value
})

const radioName = computed(() => props.name || undefined)

function handleChange() {
  if (isDisabled.value) return
  const val = props.value!
  if (isGroup.value) {
    radioGroup!.changeEvent(val)
  } else {
    emit('update:modelValue', val)
    emit('change', val)
  }
  formItem?.validate('change')
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      radioSize !== 'default' ? ns.m(radioSize) : '',
      ns.is('checked', isChecked),
      ns.is('disabled', isDisabled),
      ns.is('bordered', border),
    ]"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    :tabindex="isDisabled ? -1 : 0"
    @keydown.space.prevent="handleChange"
  >
    <span :class="[ns.e('input'), ns.is('checked', isChecked)]">
      <input
        type="radio"
        :class="ns.e('original')"
        :value="value"
        :name="radioName"
        :disabled="isDisabled"
        :checked="isChecked"
        @change="handleChange"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
