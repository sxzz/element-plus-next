/**
 * @vitest-environment node
 */

import fs from 'fs'
import { describe, expect, it, vi } from 'vitest'
import { getTsConfig, getTsConfigPaths } from '../src'

describe('typescript', () => {
  it('getTsConfigPaths should work', async () => {
    const paths = await getTsConfigPaths()
    expect(paths).a('object')
    expect(Object.keys(paths).length).greaterThan(0)
  })

  it('getTsConfig should throw when wrong path', async () => {
    await expect(() =>
      getTsConfig('/wrong/path')
    ).rejects.toMatchInlineSnapshot("[Error: Cannot read file '/wrong/path'.]")
  })

  it('getTsConfig should throw when wrong content', async () => {
    vi.spyOn(fs, 'readFileSync').mockReturnValue('{}')

    const error = await getTsConfig('/wrong/content').catch((err) => err)
    expect(error.errors || error).toMatchInlineSnapshot(`
      [SyntaxError: Promises rejected.
      No inputs were found in config file 'tsconfig.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.]
    `)
  })
})
