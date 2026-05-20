import type { Component, ExtractPropTypes, PropType } from 'vue'
import { definePropType } from '@stellux/utils'

export const avatarProps = {
  size: {
    type: [Number, String] as PropType<number | '' | 'small' | 'default' | 'large'>,
    default: 'default',
  },
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
  },
  icon: {
    type: definePropType<Component>(Object),
    default: undefined,
  },
  src: { type: String, default: '' },
  srcSet: { type: String, default: '' },
  alt: { type: String, default: '' },
  fit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    default: 'cover',
  },
} as const

export const avatarEmits = {
  error: (evt: Event) => true,
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
