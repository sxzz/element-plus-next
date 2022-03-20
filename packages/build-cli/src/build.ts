import path from 'path'
import { promises as fs } from 'fs'
import { build as tsup } from 'tsup'
import Vue from 'unplugin-vue/esbuild'
import { getPackage } from '@element-plus-dev/build-utils'
import { getConfig } from './utils'
import type { Plugin } from 'esbuild'
import type { Options } from 'tsup'

export async function build(packageName?: string) {
  const pkg = await getPackage(packageName)
  if (!pkg) throw new Error("pkg doesn't exist!")
  const config = await getConfig(pkg)

  const outDir = path.resolve(pkg.dir, 'dist')
  const options: Options = {
    outDir,
    target: 'es2018',
    format: config.format,
    splitting: false,
    entry: [path.resolve(pkg.dir, 'src/index.ts')],
  }

  const plugins: Plugin[] = [Vue()]

  await fs.rm(outDir, { recursive: true, force: true })

  process.chdir(pkg.dir)
  await Promise.all([
    tsup({
      ...options,
      name: 'ep-cli-tsup',
      esbuildOptions(options) {
        options.entryNames = `[dir]/${config.name}`
      },
      loader: {},
      esbuildPlugins: plugins,
    }),
    tsup({
      ...options,
      name: 'ep-cli-tsup-minify',
      minify: true,
      esbuildOptions(options) {
        options.entryNames = `[dir]/${config.name}.min`
      },
      esbuildPlugins: plugins,
    }),
  ])
}
