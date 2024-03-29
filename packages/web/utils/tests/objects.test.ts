import * as vueShared from '@vue/shared'
import { describe, expect, it } from 'vitest'
import { entriesOf, getProp, hasOwn, keysOf } from '../src'

const AXIOM = 'Rem is the best girl'

describe('objects', () => {
  it('getProp should work', () => {
    const obj = {
      a: {
        b: {
          c: 'd',
        },
      },
      foo: {
        ['@@::']: 'hello',
        'abc.': 'cde',
      },
      key: 'value',
    }

    // get
    expect(getProp(obj, 'a.b.c').value).toBe('d')
    expect(getProp(obj, 'key').value).toBe('value')
    expect(getProp(obj, 'foo.@@::').value).toBe('hello')
    expect(getProp(obj, ['foo', 'abc.']).value).toBe('cde')

    // set
    getProp(obj, ['foo', 'abc.']).value = AXIOM
    expect(obj.foo['abc.']).toBe(AXIOM)

    getProp(obj, 'a.b.c').value = AXIOM
    expect(obj.a.b.c).toBe(AXIOM)
  })

  it('keysOf should work', () => {
    const obj = { key: 'value', foo: 'bar' }
    expect(keysOf(obj)).toEqual(Object.keys(obj))
  })

  it('entriesOf should work', () => {
    const obj = { key: 'value', foo: 'bar' }
    expect(entriesOf(obj)).toEqual(Object.entries(obj))
  })

  it('should re-exported by @vue/shared', () => {
    expect(hasOwn).toBe(vueShared.hasOwn)
  })
})
