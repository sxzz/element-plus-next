import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  target: 'node12',
  clean: true,
  esbuildOptions(options) {
    if (options.format === 'cjs') options.outExtension = { '.js': '.cjs' }
  },
})
