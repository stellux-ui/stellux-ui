import { withInstall } from '@stellux/utils'
import Card from './card.vue'

export const StxCard = withInstall(Card)
export default StxCard

export { cardProps } from './card'
export type { CardProps } from './card'
