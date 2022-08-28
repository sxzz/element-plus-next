import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import './vite.init'

export default defineConfig(async () => {
  return {
    resolve: {
      conditions: ['dev'],
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: Vue({
            reactivityTransform: true,
          }),
        },
      }),

      Components({
        // TODO: vue-components-resolver
        // resolvers: [ElementPlusResolver()],
        dts: path.resolve('src/components.d.ts'),
      }),
    ],
  }
})
