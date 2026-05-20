import type { InjectionKey, Ref } from 'vue'

export interface ScrollbarContext {
  wrapRef: Ref<HTMLElement | undefined>
}

export const scrollbarContextKey: InjectionKey<ScrollbarContext> =
  Symbol('scrollbarContext')
