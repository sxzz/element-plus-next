import type { InjectionKey } from 'vue'

export interface CollapseContext {
  // v3 TODO: rename any
  activeNames: any // Ref<CollapseActiveName[]>
  handleItemClick: any // (name: CollapseActiveName) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContextKey')
