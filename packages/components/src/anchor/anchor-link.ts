import type { ExtractPropTypes } from 'vue'

export const anchorLinkProps = {
  href: { type: String, default: '' },
  title: { type: String, default: '' },
} as const

export type AnchorLinkProps = ExtractPropTypes<typeof anchorLinkProps>
