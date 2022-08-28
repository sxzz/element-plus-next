import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
import { debugWarn, keysOf } from '@element-plus-next/utils'
import type { ComponentSize } from '@element-plus-next/constants'
import type { Language } from '@element-plus-next/locale'
import type { App, InjectionKey, Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

export interface GlobalConfigButton {
  autoInsertSpace?: boolean
}

export interface GlobalConfigMessage {
  max?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GlobalConfigExperimentalFeatures {
  // to be defined
}

export interface GlobalConfig {
  a11y?: boolean
  keyboardNavigation?: boolean
  locale?: Language
  size?: ComponentSize
  button?: GlobalConfigButton
  experimentalFeatures?: GlobalConfigExperimentalFeatures
  message?: GlobalConfigMessage
  zIndex?: number
  namespace?: string
}

export const globalConfigKey: InjectionKey<Ref<GlobalConfig>> =
  Symbol('globalConfigKey')

// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
// refer to: https://github.com/element-plus/element-plus/issues/2610#issuecomment-887965266
const globalConfig = ref<GlobalConfig>()

export function useGlobalConfig<
  K extends keyof GlobalConfig,
  D extends GlobalConfig[K]
>(key: K, defaultValue?: D): Ref<Exclude<GlobalConfig[K], undefined> | D>
export function useGlobalConfig(): Ref<GlobalConfig>
export function useGlobalConfig(
  key?: keyof GlobalConfig,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(globalConfigKey, globalConfig)
    : globalConfig
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  } else {
    return config
  }
}

export const provideGlobalConfig = (
  config: MaybeRef<GlobalConfig>,
  app?: App,
  global = false
) => {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = app?.provide ?? (inSetup ? provide : undefined)
  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup().'
    )
    return
  }

  const context = computed(() => {
    const cfg = unref(config)
    if (!oldConfig?.value) return cfg
    return mergeConfig(oldConfig.value, cfg)
  })
  provideFn(globalConfigKey, context)
  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }
  return context
}

const mergeConfig = (a: GlobalConfig, b: GlobalConfig): GlobalConfig => {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  const obj: Record<string, any> = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}
