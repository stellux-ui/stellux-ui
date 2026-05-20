import type { ExtractPropTypes, PropType } from 'vue'

export const splitterProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
} as const

export const splitterEmits = {
  'resize-start': (sizes: number[]) => Array.isArray(sizes),
  'resize-end': (sizes: number[]) => Array.isArray(sizes),
  resize: (sizes: number[]) => Array.isArray(sizes),
}

export type SplitterProps = ExtractPropTypes<typeof splitterProps>
export type SplitterEmits = typeof splitterEmits
