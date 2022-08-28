import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig, loadEnv } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import UnoCSS from 'unocss/vite'
import mkcert from 'vite-plugin-mkcert'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

import type { Alias } from 'vite'

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
  },
]

// v3 TODO
// if (process.env.DOC_ENV !== 'production') {
//   alias.push(
//     {
//       find: /^element-plus(\/(es|lib))?$/,
//       replacement: path.resolve(projRoot, 'packages/element-plus/index.ts'),
//     },
//     {
//       find: /^element-plus\/(es|lib)\/(.*)$/,
//       replacement: `${path.resolve(projRoot, 'packages')}/$2`,
//     }
//   )
// }

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      host: true,
      https: !!env.HTTPS,
      fs: {
        // v3 todo
        // allow: [projRoot],
        strict: false,
      },
    },
    resolve: {
      alias,
    },
    plugins: [
      vueJsx(),
      DefineOptions(),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['.vitepress/vitepress/components'],

        allowOverrides: true,

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver(),
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
      }),
      UnoCSS(),
      MarkdownTransform(),
      Inspect(),
      mkcert(),
    ],
    optimizeDeps: {
      // v3 TODO
      // include: optimizeDeps,
    },
  }
})
