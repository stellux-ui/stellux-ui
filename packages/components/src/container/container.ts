import type { ExtractPropTypes, PropType } from 'vue'

export const containerProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: ''
  }
} as const

export type ContainerProps = ExtractPropTypes<typeof containerProps>
