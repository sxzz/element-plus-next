import { components } from './components'

import type { Plugin } from 'vue'

const INSTALLED_KEY = Symbol('INSTALLED_KEY') // TODO: add prefix to description.

declare module 'vue' {
  interface App {
    [INSTALLED_KEY]?: boolean
  }
}

export const makeInstaller = (components: Plugin[] = []): Plugin => {
  const install: Plugin['install'] = (app, options) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true

    components.forEach((c) => app.use(c))
  }

  return { install }
}

export const defaultInstaller = makeInstaller(components)
