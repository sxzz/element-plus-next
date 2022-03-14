import findWorkspaceDir from '@pnpm/find-workspace-dir'
import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { PKG_PREFIX } from './constants'

import type { Project } from '@pnpm/find-workspace-packages'

let workspaceRoot: string
export const getWorkspaceRoot = async () => {
  if (workspaceRoot) return workspaceRoot
  return (workspaceRoot = (await findWorkspaceDir(__dirname))!)
}

let pkgs: Record<string, Project>
export const getWorkspacePackages = async () => {
  if (pkgs) return pkgs
  const _pkgs = await findWorkspacePackages(await getWorkspaceRoot())
  return (pkgs = Object.fromEntries(
    _pkgs
      .filter((pkg) => !!pkg?.manifest?.name)
      .map((pkg) => [pkg.manifest.name!, pkg])
  ))
}

export const getDependencies = (pkg: Project, includeDev = false) =>
  Array.from(
    new Set([
      ...Object.keys(pkg.manifest.peerDependencies ?? {}),
      ...Object.keys(pkg.manifest.dependencies ?? {}),
      ...Object.keys((includeDev ? pkg.manifest.devDependencies : {}) ?? {}),
    ])
  )

export const getPackage = async (packageName?: string) => {
  const pkgs = await getWorkspacePackages()
  if (packageName) {
    return pkgs[packageName] ?? pkgs[`${PKG_PREFIX}${packageName}`]
  } else {
    return Object.values(pkgs).find((pkg) => pkg.dir === process.cwd())!
  }
}

export type { Project }
