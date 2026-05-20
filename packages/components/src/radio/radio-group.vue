<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import { useNamespace, useFormItem } from '@stellux/hooks'
import { radioGroupProps, radioGroupEmits } from './radio-group'
import { radioGroupContextKey } from './constants'

defineOptions({ name: 'StxRadioGroup' })

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const ns = useNamespace('radio-group')
const { formItem } = useFormItem()

function changeEvent(val: any) {
  emit('update:modelValue', val)
  emit('change', val)
  formItem?.validate('change')
}

provide(
  radioGroupContextKey,
  reactive({
    ...toRefs(props),
    changeEvent,
  }),
)
</script>

<template>
  <div :class="ns.b()" role="radiogroup">
    <slot />
  </div>
</template>
