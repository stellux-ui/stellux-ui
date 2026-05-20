import type { ExtractPropTypes } from 'vue'

export const splitterPanelProps = {
  size: { type: Number, default: undefined },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  collapsible: Boolean,
} as const

export type SplitterPanelProps = ExtractPropTypes<typeof splitterPanelProps>
