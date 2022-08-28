import { isArray, isObject } from '@vue/shared'
import { isNil } from 'lodash-unified'

export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
  toTypeString,
  toRawType,
} from '@vue/shared'
export { isBoolean, isNumber } from '@vueuse/shared'

export const isUndefined = (val: any): val is undefined => val === undefined

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

export const isElement = (e: unknown): e is Element =>
  typeof Element !== 'undefined' && e instanceof Element

export const isPropAbsent = (prop: unknown): prop is null | undefined => {
  return isNil(prop)
}
