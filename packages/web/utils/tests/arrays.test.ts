import { describe, expect, it } from 'vitest'
import { castArray as lodashCastArray } from 'lodash-es'
import { castArray, ensureArray, tuple, unique } from '../src'

describe('arrays', () => {
  it('tuple should work', () => {
    expect(tuple(1, 2, 3, 'str', true, false)).toStrictEqual([
      1,
      2,
      3,
      'str',
      true,
      false,
    ])
  })

  it('unique should work', () => {
    expect(unique([1, 2, 3, 1])).toEqual([1, 2, 3])
    expect(unique([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('ensureArray should work', () => {
    expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3])
    expect(ensureArray(0)).toEqual([0])
    expect(ensureArray(undefined)).toEqual([])
  })

  it('re-export castArray', () => {
    expect(castArray).toBe(lodashCastArray)
  })
})
