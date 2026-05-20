import type { ExtractPropTypes, PropType } from 'vue'

export const anchorProps = {
  container: { type: [String, Object] as PropType<string | HTMLElement | Window>, default: undefined },
  offset: { type: Number, default: 0 },
  bound: { type: Number, default: 15 },
  duration: { type: Number, default: 300 },
  marker: { type: Boolean, default: true },
  type: { type: String as PropType<'default' | 'underline'>, default: 'default' },
  direction: { type: String as PropType<'vertical' | 'horizontal'>, default: 'vertical' },
} as const

export const anchorEmits = {
  change: (href: string) => typeof href === 'string',
  click: (evt: MouseEvent, href: string) => true,
}

export type AnchorProps = ExtractPropTypes<typeof anchorProps>
export type AnchorEmits = typeof anchorEmits
