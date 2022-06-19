import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import './vite.init'

export default defineConfig(async () => {
  return {
    resolve: {
      conditions: ['dev'],
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),
      Components({
        // TODO: vue-components-resolver
        // resolvers: [ElementPlusResolver()],
        dts: path.resolve('src/components.d.ts'),
      }),
    ],
  }
})
