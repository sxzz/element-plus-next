import { defineConfig } from '@element-plus-next/build-published/config'

export default defineConfig({
  tsup: {
    entry: ['./src/**/*.ts'],
  },
})
