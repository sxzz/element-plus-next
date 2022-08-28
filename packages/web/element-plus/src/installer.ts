import { INSTALLED_KEY } from '@element-plus-next/constants'
import { components } from './components'
import type { Plugin } from 'vue'

export const makeInstaller = (components: Plugin[] = []): Plugin => {
  const install: Plugin['install'] = (app) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true

    components.forEach((c) => app.use(c))
  }

  return { install }
}

export const defaultInstaller = makeInstaller(components)
