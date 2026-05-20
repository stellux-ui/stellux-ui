<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watch,
} from 'vue'
import Schema from 'async-validator'
import type { RuleItem } from 'async-validator'
import { useNamespace, formContextKey, formItemContextKey } from '@stellux/hooks'
import type { FormItemContext } from '@stellux/hooks'
import { formItemProps } from './form-item'

defineOptions({ name: 'StxFormItem' })

const props = defineProps(formItemProps)

const ns = useNamespace('form-item')
const form = inject(formContextKey, undefined)

const validateMessage = ref('')
const validateState = ref('')
let initialValue: any = undefined

const sizeClass = computed(() => props.size || form?.size || 'default')

const fieldValue = computed(() => {
  if (!form?.model || !props.prop) return undefined
  return form.model[props.prop]
})

const fieldRules = computed((): RuleItem[] => {
  const ownRules = props.rules
    ? Array.isArray(props.rules)
      ? props.rules
      : [props.rules]
    : []

  const formRules = form?.rules && props.prop ? form.rules[props.prop] : undefined
  const parentRules = formRules
    ? Array.isArray(formRules)
      ? formRules
      : [formRules]
    : []

  const merged = [...parentRules, ...ownRules]

  if (props.required !== undefined) {
    const hasRequired = merged.some((rule) => rule.required !== undefined)
    if (!hasRequired) {
      merged.push({ required: props.required })
    }
  }

  return merged
})

const isRequired = computed(() => {
  return fieldRules.value.some((rule) => rule.required === true)
})

const labelStyle = computed(() => {
  const width = props.labelWidth || form?.labelWidth
  if (!width) return {}
  const w = typeof width === 'number' ? `${width}px` : width
  return { width: w, minWidth: w }
})

const showMessage = computed(() => {
  return (props.showMessage ?? form?.showMessage) !== false
})

function getFilteredRules(trigger?: string): RuleItem[] {
  const rules = fieldRules.value
  if (!trigger) return rules
  return rules.filter((rule) => {
    const ruleTrigger = (rule as any).trigger
    if (!ruleTrigger) return true
    if (Array.isArray(ruleTrigger)) return ruleTrigger.includes(trigger)
    return ruleTrigger === trigger
  })
}

async function validate(trigger?: string): Promise<boolean> {
  const rules = getFilteredRules(trigger)
  if (rules.length === 0 || !props.prop) {
    validateMessage.value = ''
    validateState.value = 'success'
    return true
  }

  const descriptor = { [props.prop]: rules }
  const validator = new Schema(descriptor)
  const data = { [props.prop]: fieldValue.value }

  try {
    await validator.validate(data)
    validateMessage.value = ''
    validateState.value = 'success'
    return true
  } catch (err: any) {
    const errors = err.errors
    validateMessage.value = errors?.[0]?.message || ''
    validateState.value = 'error'
    return false
  }
}

function clearValidate() {
  validateMessage.value = ''
  validateState.value = ''
}

function resetField() {
  if (form?.model && props.prop) {
    form.model[props.prop] = initialValue
  }
  clearValidate()
}

const context: FormItemContext = reactive({
  prop: toRef(props, 'prop'),
  size: computed(() => sizeClass.value),
  disabled: computed(() => !!form?.disabled),
  validate,
  clearValidate,
  resetField,
})

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    form?.addField(context)
    if (form?.model) {
      const val = form.model[props.prop]
      initialValue = Array.isArray(val) ? [...val] : val
    }
  }
})

onBeforeUnmount(() => {
  form?.removeField(context)
})

watch(
  () => props.error,
  (val) => {
    if (val) {
      validateMessage.value = val
      validateState.value = 'error'
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('error', !!validateMessage),
      ns.is('required', isRequired),
      sizeClass !== 'default' ? ns.m(sizeClass) : '',
    ]"
    :data-form-prop="prop"
  >
    <label
      v-if="label || $slots.label"
      :class="ns.e('label')"
      :style="labelStyle"
      :for="props.for"
    >
      <span
        v-if="isRequired && !form?.hideRequiredAsterisk && form?.requireAsteriskPosition === 'left'"
        :class="ns.e('required-asterisk')"
      >*</span>
      <slot name="label">{{ label }}</slot>
      <span
        v-if="isRequired && !form?.hideRequiredAsterisk && form?.requireAsteriskPosition === 'right'"
        :class="ns.e('required-asterisk')"
      >*</span>
      <span v-if="form?.labelSuffix">{{ form.labelSuffix }}</span>
    </label>
    <div :class="ns.e('content')">
      <slot />
      <div
        v-if="validateMessage && showMessage"
        :class="[ns.e('error'), props.inlineMessage ? ns.em('error', 'inline') : '']"
      >
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
