import { withInstall } from '@stellux/utils'
import Avatar from './avatar.vue'

export const StxAvatar = withInstall(Avatar)
export default StxAvatar

export { avatarProps, avatarEmits } from './avatar'
export type { AvatarProps } from './avatar'
