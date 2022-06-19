import { defineConfig } from '@element-plus-next/build/config'

export default defineConfig({
  platform: 'node',
  tsup: {
    format: ['esm'],
  },
})
