import type { ComputedRef, InjectionKey, WritableComputedRef } from 'vue'

export interface ElPaginationContext {
  currentPage?: WritableComputedRef<number>
  pageCount?: ComputedRef<number>
  disabled?: ComputedRef<boolean>
  changeEvent?: (val: number) => void
  handleSizeChange?: (val: number) => void
}

// v3 TODO: rename
export const elPaginationKey: InjectionKey<ElPaginationContext> =
  Symbol('elPaginationKey')
