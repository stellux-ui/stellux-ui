import type { InjectionKey, Ref } from 'vue'

export interface CarouselContext {
  activeIndex: Ref<number>
  items: Ref<number[]>
  direction: Ref<string>
  type: Ref<string>
  loop: Ref<boolean>
  addItem: (uid: number) => void
  removeItem: (uid: number) => void
}

export const carouselContextKey: InjectionKey<CarouselContext> = Symbol('carouselContext')
