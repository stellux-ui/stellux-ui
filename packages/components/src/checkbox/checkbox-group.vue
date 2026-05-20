<script setup lang="ts">
import { provide, reactive, toRef, toRefs } from 'vue'
import { useNamespace, useFormItem } from '@stellux/hooks'
import { checkboxGroupProps, checkboxGroupEmits } from './checkbox-group'
import { checkboxGroupContextKey } from './constants'

defineOptions({ name: 'StxCheckboxGroup' })

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const ns = useNamespace('checkbox-group')
const { formItem } = useFormItem()

function changeEvent(val: any[]) {
  emit('update:modelValue', val)
  emit('change', val)
  formItem?.validate('change')
}

provide(
  checkboxGroupContextKey,
  reactive({
    modelValue: toRef(props, 'modelValue'),
    size: toRef(props, 'size'),
    disabled: toRef(props, 'disabled'),
    min: toRef(props, 'min'),
    max: toRef(props, 'max'),
    changeEvent,
  }),
)
</script>

<template>
  <div :class="ns.b()" role="group" aria-label="checkbox-group">
    <slot />
  </div>
</template>
