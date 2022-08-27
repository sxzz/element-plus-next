import type { ComputedRef, InjectionKey, Ref, Slots, UnwrapRef } from 'vue'

// v3 TODO: remove any

export type TabsPaneContext = UnwrapRef<{
  uid: number
  slots: Slots
  props: any /* TabPaneProps */
  paneName: ComputedRef<string | number | undefined>
  active: ComputedRef<boolean>
  index: Ref<string | undefined>
  isClosable: ComputedRef<boolean>
}>

export interface TabsRootContext {
  props: any /* TabsProps */
  currentName: Ref<string | number>
  registerPane: (pane: TabsPaneContext) => void
  unregisterPane: (uid: number) => void
}

export const tabsRootContextKey: InjectionKey<TabsRootContext> =
  Symbol('tabsRootContextKey')
