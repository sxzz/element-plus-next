/**
 * @vitest-environment node
 */

import path from 'path'
import { describe, it, expect } from 'vitest'
import { getWorkspaceRoot, getWorkspacePackages, getDependencies } from '../src'

describe('workspace', () => {
  it('getWorkspaceRoot should work', async () => {
    const root = await getWorkspaceRoot()
    expect(root).toBe(path.resolve(__dirname, '../../..'))
  })

  it('getWorkspacePackages should work', async () => {
    const pkgs = await getWorkspacePackages()
    expect(Object.keys(pkgs).length).greaterThan(0)
  })

  it('getDependencies should work', async () => {
    const pkgs = await getWorkspacePackages()
    const pkg = pkgs['@element-plus/build-utils']
    const deps = getDependencies(pkg)
    expect(deps).contain('@pnpm/find-workspace-packages')
    expect(deps).not.contain('tsup')

    const depsWithDev = getDependencies(pkg, true)
    expect(depsWithDev).contain('@pnpm/find-workspace-packages')
    expect(depsWithDev).contain('typescript')
  })
})
