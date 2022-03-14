import { loadConfig } from 'c12'

import type { BuildOptions } from '../types'
import type { Project } from '@element-plus/build-utils'

export type BuildOptionsResolved = Required<BuildOptions>

export function resolveConfig(options?: BuildOptions): BuildOptionsResolved {
  return {
    name: 'index',
    format: ['cjs', 'esm'],
    ...(options ?? {}),
  }
}

export async function getConfig(pkg: Project): Promise<BuildOptionsResolved> {
  const { config } = await loadConfig<BuildOptions>({
    cwd: pkg.dir,
    name: 'build',
  })
  return resolveConfig(config)
}
