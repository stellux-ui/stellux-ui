<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import { useNamespace, formContextKey } from '@stellux/hooks'
import type { FormItemContext } from '@stellux/hooks'
import { formProps } from './form'

defineOptions({ name: 'StxForm' })

const props = defineProps(formProps)

const ns = useNamespace('form')

const fields: FormItemContext[] = []

function addField(field: FormItemContext) {
  fields.push(field)
}

function removeField(field: FormItemContext) {
  const idx = fields.indexOf(field)
  if (idx !== -1) fields.splice(idx, 1)
}

const { model, rules, labelWidth, labelPosition, labelSuffix, size, disabled } = toRefs(props)

provide(
  formContextKey,
  reactive({
    model,
    rules,
    labelWidth,
    labelPosition,
    labelSuffix,
    size,
    disabled,
    addField,
    removeField,
  }),
)

async function validate(callback?: (valid: boolean) => void): Promise<boolean> {
  if (fields.length === 0) {
    callback?.(true)
    return true
  }

  const results = await Promise.all(fields.map((field) => field.validate()))
  const valid = results.every(Boolean)
  callback?.(valid)
  return valid
}

async function validateField(
  fieldProps?: string | string[],
  callback?: (valid: boolean) => void,
): Promise<boolean> {
  const targets = getFilteredFields(fieldProps)
  const results = await Promise.all(targets.map((field) => field.validate()))
  const valid = results.every(Boolean)
  callback?.(valid)
  return valid
}

function resetFields(fieldProps?: string | string[]) {
  const targets = getFilteredFields(fieldProps)
  targets.forEach((field) => field.resetField())
}

function clearValidate(fieldProps?: string | string[]) {
  const targets = getFilteredFields(fieldProps)
  targets.forEach((field) => field.clearValidate())
}

function scrollToField(prop: string) {
  const field = fields.find((f) => f.prop === prop)
  if (field) {
    const el = document.querySelector(`[data-form-prop="${prop}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function getFilteredFields(fieldProps?: string | string[]): FormItemContext[] {
  if (!fieldProps) return fields
  const props = Array.isArray(fieldProps) ? fieldProps : [fieldProps]
  return fields.filter((field) => field.prop && props.includes(field.prop))
}

defineExpose({ validate, validateField, resetFields, clearValidate, scrollToField })
</script>

<template>
  <form
    :class="[ns.b(), ns.m(labelPosition), ns.is('inline', inline)]"
    @submit.prevent
  >
    <slot />
  </form>
</template>
