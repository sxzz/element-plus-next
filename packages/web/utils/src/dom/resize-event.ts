import { isServer } from '../browser'

import type { HTMLElementCustomized } from '../typings'

export type ResizableElement = HTMLElementCustomized<{
  __resizeListeners__?: Array<(...args: unknown[]) => unknown>
  __ro__?: ResizeObserver
}>

const resizeHandler = function (entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const listeners =
      (entry.target as ResizableElement).__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn) => {
        fn()
      })
    }
  }
}

/** @deprecated use `useResizeObserver` or `useElementSize` in vueuse */
export const addResizeListener = function (
  element: ResizableElement,
  fn: (...args: unknown[]) => unknown
): void {
  if (isServer || !element) return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

/** @deprecated use `useResizeObserver` or `useElementSize` in vueuse */
export const removeResizeListener = function (
  element: ResizableElement,
  fn: (...args: unknown[]) => unknown
): void {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__?.disconnect()
  }
}
