import { APP_INSTALLED_KEY } from '@element-plus-next/constants'
import { components } from './components'
import type { Plugin } from 'vue'

export const makeInstaller = (components: Plugin[] = []): Plugin => {
  const install: Plugin['install'] = (app, options) => {
    if (app[APP_INSTALLED_KEY]) return
    app[APP_INSTALLED_KEY] = true

    components.forEach((c) => app.use(c))
  }

  return { install }
}

export const defaultInstaller = makeInstaller(components)
