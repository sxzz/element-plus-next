import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    mainFields: ['module:dev', 'module', 'jsnext:main', 'jsnext'],
  },
  test: {
    environment: 'jsdom',
  },
})
