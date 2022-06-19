import { defineConfig } from 'tsup'
import { resolveModule } from 'local-pkg'

export default defineConfig(() => {
  return {
    entry: ['src/index.ts'],
    format: ['esm'],
    clean: true,
    dts: true,
    tsconfig: resolveModule('@element-plus-next/tsconfig/tsconfig.node.json'),
  }
})
