/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../env.d.ts" />

import { provideGlobalConfig } from '@element-plus-next/vue-context'
import { components } from './components'
import type { GlobalConfig } from '@element-plus-next/vue-context'
import type { Plugin } from 'vue'

export const APP_INSTALLED_KEY = Symbol('Element Plus App')

export const makeInstaller = (components: Plugin[] = []): Plugin => {
  const install: Plugin['install'] = (app, options?: GlobalConfig) => {
    if (app[APP_INSTALLED_KEY]) return
    app[APP_INSTALLED_KEY] = true

    components.forEach((c) => app.use(c))

    if (options) provideGlobalConfig(options, app, true)
  }

  return { install }
}

export const defaultInstaller = makeInstaller(components)
