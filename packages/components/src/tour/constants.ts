import type { InjectionKey, Ref } from 'vue'

export interface TourStepData {
  uid: number
  target?: string | HTMLElement | (() => HTMLElement | null)
  title: string
  description: string
  placement?: string
  showArrow?: boolean
  mask?: boolean | { color?: string }
  type?: 'default' | 'primary'
  nextButtonProps?: Record<string, any>
  prevButtonProps?: Record<string, any>
}

export interface TourContext {
  current: Ref<number>
  registerStep: (step: TourStepData) => void
  unregisterStep: (uid: number) => void
  updateStep: (uid: number, step: TourStepData) => void
}

export const tourContextKey: InjectionKey<TourContext> =
  Symbol('tourContext')
