import type { ComponentSize } from '@element-plus-next/constants'
import type { InjectionKey, UnwrapNestedRefs } from 'vue'

export type SizeContext = UnwrapNestedRefs<{
  from: string
  size: ComponentSize
}>

export const sizeContextKey: InjectionKey<SizeContext> =
  Symbol('sizeContextKey')
