import path from 'path'
import { rm } from 'fs/promises'
import { build as tsup } from 'tsup'
import Vue from 'unplugin-vue/esbuild'
import { getPackage } from '@element-plus-next/node-utils'
import { target } from '@element-plus-next/node-constants'
import { importConfig } from './utils'
import type { Plugin } from 'esbuild'
import type { Options } from 'tsup'

export async function build(packageName?: string) {
  const pkg = await getPackage(packageName)
  if (!pkg) throw new Error("pkg doesn't exist!")

  const config = await importConfig(pkg)

  const outDir = path.resolve(pkg.dir, 'dist')
  const options: Options = {
    entry: [path.resolve(pkg.dir, 'src/index.ts')],
    outDir,
    target,
    format: config.format,
    splitting: false,
  }

  const plugins: Plugin[] = [Vue()]

  await rm(outDir, { recursive: true, force: true })

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
