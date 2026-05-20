import { withInstall } from '@stellux/utils'
import Steps from './steps.vue'
import Step from './step.vue'

export const StxSteps = withInstall(Steps)
export const StxStep = withInstall(Step)
export default StxSteps

export { stepsProps } from './steps'
export { stepProps } from './step'
export type { StepsProps } from './steps'
export type { StepProps } from './step'
