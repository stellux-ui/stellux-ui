import type { ExtractPropTypes, PropType } from 'vue'

export const affixProps = {
  offset: { type: Number, default: 0 },
  position: { type: String as PropType<'top' | 'bottom'>, default: 'top' },
  target: { type: String, default: '' },
  zIndex: { type: Number, default: 100 },
} as const

export const affixEmits = {
  change: (fixed: boolean) => typeof fixed === 'boolean',
  scroll: (payload: { scrollTop: number; fixed: boolean }) => true,
}

export type AffixProps = ExtractPropTypes<typeof affixProps>
export type AffixEmits = typeof affixEmits
