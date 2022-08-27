/**
 * @vitest-environment node
 */

import path from 'path'
import { describe, expect, it, vi } from 'vitest'
import {
  getDependencies,
  getPackage,
  getWorkspacePackages,
  getWorkspaceRoot,
} from '../src'

describe('workspace', () => {
  it('getWorkspaceRoot should work', async () => {
    const root = await getWorkspaceRoot()
    expect(root).toBe(path.resolve(__dirname, '../../../..'))
  })

  it('getWorkspacePackages should work', async () => {
    const pkgs = await getWorkspacePackages()
    expect(Object.keys(pkgs).length).greaterThan(0)
  })

  it('getDependencies should work', async () => {
    const pkgs = await getWorkspacePackages()
    const pkg = pkgs['@element-plus-next/build-utils']
    const deps = getDependencies(pkg)
    expect(deps).contain('@pnpm/find-workspace-packages')
    expect(deps).not.contain('tsup')

    const depsWithDev = getDependencies(pkg, { includeDev: true })
    expect(depsWithDev).contain('@pnpm/find-workspace-packages')
    expect(depsWithDev).contain('typescript')
  })

  describe('getPackage should work', () => {
    it('with package name and prefix', async () => {
      const pkg = await getPackage('@element-plus-next/build-utils')
      expect(pkg?.manifest.name).toBe('@element-plus-next/build-utils')
    })

    it('with package name and not prefix', async () => {
      const pkg = await getPackage('build-utils')
      expect(pkg?.manifest.name).toBe('@element-plus-next/build-utils')
    })

    it('without package name', async () => {
      const _pkg = await getPackage('@element-plus-next/build-utils')
      vi.spyOn(process, 'cwd').mockImplementation(() => _pkg!.dir)

      const pkg = await getPackage()
      expect(pkg?.manifest.name).toBe('@element-plus-next/build-utils')
    })
  })
})
