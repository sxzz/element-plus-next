import type { InjectionKey } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BreadcrumbContext {
  // v3 TODO
}

// v3 TODO: rename breadcrumbContextKey
export const breadcrumbKey: InjectionKey<BreadcrumbContext> =
  Symbol('breadcrumbKey')
