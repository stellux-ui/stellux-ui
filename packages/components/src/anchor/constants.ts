import type { InjectionKey, Ref } from 'vue'

export interface AnchorContext {
  activeHref: Ref<string>
  handleLinkClick: (evt: MouseEvent, href: string) => void
  registerLink: (href: string) => void
  unregisterLink: (href: string) => void
}

export const anchorContextKey: InjectionKey<AnchorContext> =
  Symbol('anchorContext')
