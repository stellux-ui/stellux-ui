import type { ExtractPropTypes, PropType } from 'vue'

export const collapseProps = {
  modelValue: {
    type: [Array, String, Number] as PropType<
      (string | number)[] | string | number
    >,
    default: () => [],
  },
  accordion: Boolean,
} as const

export const collapseEmits = {
  'update:modelValue': (val: (string | number)[]) => true,
  change: (val: (string | number)[]) => true,
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits
