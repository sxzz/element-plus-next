import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  esbuildOptions(options) {
    if (options.format === 'cjs') options.outExtension = { '.js': '.cjs' }
  },
})
