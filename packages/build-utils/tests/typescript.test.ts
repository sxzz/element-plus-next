/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { getTsConfigPaths } from '../src'

describe('typescript', () => {
  it('getTsConfigPaths should work', async () => {
    const paths = await getTsConfigPaths()
    expect(paths).a('object')
    expect(Object.keys(paths).length).greaterThan(0)
  })
})
