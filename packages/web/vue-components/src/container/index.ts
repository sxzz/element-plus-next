import { withInstall, withNoopInstall } from '@element-plus-next/vue-utils'

import Container from './src/container.vue'
import Aside from './src/aside.vue'
import Footer from './src/footer.vue'
import Header from './src/header.vue'
import Main from './src/main.vue'

export const ElContainer = withInstall(Container, {
  Aside,
  Footer,
  Header,
  Main,
})

export default ElContainer
export const ElAside = withNoopInstall(Aside)
export const ElFooter = withNoopInstall(Footer)
export const ElHeader = withNoopInstall(Header)
export const ElMain = withNoopInstall(Main)

export type ContainerInstance = InstanceType<typeof Container>
export type AsideInstance = InstanceType<typeof Aside>
export type FooterInstance = InstanceType<typeof Footer>
export type HeaderInstance = InstanceType<typeof Header>
export type MainInstance = InstanceType<typeof Main>
