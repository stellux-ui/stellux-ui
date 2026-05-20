import type { InjectionKey, Ref } from 'vue'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'

export interface StepsContext {
  active: Ref<number>
  direction: Ref<string>
  processStatus: Ref<StepStatus>
  finishStatus: Ref<StepStatus>
  space: Ref<string | number>
  simple: Ref<boolean>
  stepsCount: Ref<number>
  registerStep: (uid: number) => number
  unregisterStep: (uid: number) => void
}

export const stepsContextKey: InjectionKey<StepsContext> =
  Symbol('stepsContext')
