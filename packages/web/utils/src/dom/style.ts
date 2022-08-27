import { isNumber, isObject, isString } from '../types'
import { entriesOf, keysOf } from '../objects'
import { isServer } from '../browser'
import { debugWarn } from '../error'

const SCOPE = '@element-plus-next/utils/dom/style'

export const classNameToArray = (cls = '') =>
  cls.split(' ').filter((item) => !!item.trim())

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}

export type StyleName = Exclude<
  keyof CSSStyleDeclaration,
  | 'parentRule'
  | 'getPropertyPriority'
  | 'getPropertyValue'
  | 'item'
  | 'removeProperty'
  | 'setProperty'
  | 'length'
>

export const getStyle = (
  element: HTMLElement,
  styleName: StyleName
): string => {
  if (isServer || !element || !styleName) return ''

  try {
    const style = element.style[styleName]
    if (style) return style
    const computed = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch {
    return element.style[styleName]
  }
}

export const setStyle = (
  element: HTMLElement,
  styleName: StyleName | Record<StyleName, string>,
  value?: string
) => {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    entriesOf(styleName).forEach(([prop, value]) =>
      setStyle(element, prop, value)
    )
  } else {
    element.style[styleName] = value ?? ''
  }
}

export const removeStyle = (
  element: HTMLElement,
  style: StyleName | Record<StyleName, string>
) => {
  if (!element || !style) return

  if (isObject(style)) {
    keysOf(style).forEach((prop) => removeStyle(element, prop))
  } else {
    setStyle(element, style, '')
  }
}

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return ''
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return `${value}${defaultUnit}`
  }
  debugWarn(SCOPE, 'binding value must be a string or number')
}
