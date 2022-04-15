import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    mainFields: ['main:dev'],
  },
  test: {
    environment: 'jsdom',
  },
})
