import path from 'path'
import { defineConfig } from 'vite'
import escapeStringRegexp from 'escape-string-regexp'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { getWorkspacePackages } from '@element-plus-dev/build-utils'
import './vite.init'

import type { Alias } from 'vite'

export default defineConfig(async () => {
  const alias = Object.values(await getWorkspacePackages()).map(
    (pkg): Alias => {
      return {
        find: new RegExp(`${escapeStringRegexp(pkg.manifest.name!)}$`),
        replacement: path.resolve(pkg.dir, 'src/index.ts'),
      }
    }
  )
  return {
    resolve: {
      alias,
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),
      Components({
        // TODO: vue-components-resolver
        // resolvers: [ElementPlusResolver()],
      }),
    ],
  }
})
