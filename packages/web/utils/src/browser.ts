import { isClient } from '@vueuse/shared'

export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent)

export { isClient }
export const isServer = !isClient
