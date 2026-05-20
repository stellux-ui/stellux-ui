import { inject, computed, toRef } from 'vue'
import type { FormContext, FormItemContext } from './form-context'
import { formContextKey, formItemContextKey } from './form-context'

export function useFormItem() {
  const form = inject(formContextKey, undefined)
  const formItem = inject(formItemContextKey, undefined)

  return { form, formItem }
}

export function useFormDisabled(props: { disabled?: boolean }) {
  const form = inject(formContextKey, undefined)
  const formItem = inject(formItemContextKey, undefined)

  const isDisabled = computed(() =>
    props.disabled || formItem?.disabled?.value || form?.disabled,
  )

  return isDisabled
}

export function useFormSize(props: { size?: string }) {
  const form = inject(formContextKey, undefined)
  const formItem = inject(formItemContextKey, undefined)

  const mergedSize = computed(() =>
    props.size || formItem?.size?.value || form?.size || 'default',
  )

  return mergedSize
}
