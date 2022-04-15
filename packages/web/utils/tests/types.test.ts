import * as vueShared from '@vue/shared'
import * as vueuse from '@vueuse/core'
import { describe, expect, it } from 'vitest'
import {
  isArray,
  isBoolean,
  isDate,
  isElement,
  isEmpty,
  isFunction,
  isNumber,
  isObject,
  isPromise,
  isString,
  isSymbol,
  isUndefined,
} from '../src'

describe('types', () => {
  it('re-export from @vue/shared', () => {
    expect(isArray).toBe(vueShared.isArray)
    expect(isDate).toBe(vueShared.isDate)
    expect(isFunction).toBe(vueShared.isFunction)
    expect(isObject).toBe(vueShared.isObject)
    expect(isPromise).toBe(vueShared.isPromise)
    expect(isString).toBe(vueShared.isString)
    expect(isSymbol).toBe(vueShared.isSymbol)
  })

  it('re-export from vueuse', () => {
    expect(isBoolean).toBe(vueuse.isBoolean)
    expect(isNumber).toBe(vueuse.isNumber)
  })

  it('isUndefined should work', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('null')).toBe(false)
  })

  it('isEmpty should work', () => {
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(true)
  })

  it('isElement should work', () => {
    expect(isElement(document.createElement('div'))).toBe(true)
    expect(isElement(document.createElement('span'))).toBe(true)
    expect(isElement(document.createElement('h1'))).toBe(true)
    expect(isElement({})).toBe(false)
    expect(isElement('element')).toBe(false)
  })

  it('isElement should return false when Element is not exists', () => {
    const _Element = window.Element

    window.Element = undefined as any
    expect(isElement(document.createElement('div'))).toBe(false)

    window.Element = _Element
    expect(isElement(document.createElement('div'))).toBe(true)
  })
})
