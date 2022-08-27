import type { CSSProperties, ComputedRef, InjectionKey, Ref } from 'vue'

export type DialogContext = {
  dialogRef: Ref<HTMLElement | undefined>
  headerRef: Ref<HTMLElement | undefined>
  bodyId: Ref<string>
  // v3 TODO: rename any
  ns: any // ReturnType<typeof useNamespace>
  rendered: Ref<boolean>
  style: ComputedRef<CSSProperties>
}

// v3 TODO: rename to dialogContextKey
export const dialogInjectionKey: InjectionKey<DialogContext> =
  Symbol('dialogInjectionKey')
