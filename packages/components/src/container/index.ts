import { withInstall } from '@stellux/utils'
import Container from './container.vue'
import Header from './header.vue'
import Footer from './footer.vue'
import Aside from './aside.vue'
import Main from './main.vue'

export const StxContainer = withInstall(Container)
export const StxHeader = withInstall(Header)
export const StxFooter = withInstall(Footer)
export const StxAside = withInstall(Aside)
export const StxMain = withInstall(Main)

export { containerProps } from './container'
export type { ContainerProps } from './container'
export { headerProps } from './header'
export type { HeaderProps } from './header'
export { footerProps } from './footer'
export type { FooterProps } from './footer'
export { asideProps } from './aside'
export type { AsideProps } from './aside'
