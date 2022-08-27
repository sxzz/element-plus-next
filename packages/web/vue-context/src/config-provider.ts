import type { InjectionKey, Ref } from 'vue'

// v3 TODO: rename any
export type ConfigProviderContext = any // Partial<ConfigProviderProps>

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol('configProviderContextKey')
