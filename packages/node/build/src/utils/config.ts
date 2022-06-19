import { loadConfig } from 'unconfig'
import type { Project } from '@element-plus-next/node-utils'
import type { BuildOptions } from '../types'

export type BuildOptionsResolved = Required<BuildOptions>

export function resolveConfig(options?: BuildOptions): BuildOptionsResolved {
  return {
    name: 'index',
    format: ['cjs', 'esm'],
    ...(options ?? {}),
  }
}

export async function importConfig(
  pkg: Project
): Promise<BuildOptionsResolved> {
  const { config } = await loadConfig<BuildOptions>({
    sources: [
      {
        files: 'build.config',
        // default extensions
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
      },
    ],
    cwd: pkg.dir,
  })
  return resolveConfig(config)
}
